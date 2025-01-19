import { BadRequestException, Body, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { eq, sql } from 'drizzle-orm';

import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { post, postTagsTag, tag } from 'src/drizzle/schema/schema';

// tables
import { Post } from '../post.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/users/user.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';

// others
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';

import { DRIZZLE } from 'src/drizzle/drizzle.module';

// services
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination';

/**
 * created a post service
 * @class
 */
@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting drizzle db
     * @property
     * */
    @Inject(DRIZZLE)
    public db: DrizzleDB,

    /**
     * Injecting postsRepository
     * @constructor
     * */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Injecting metaOptionsRespository
     * @constructor
     * */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    /**
     * Injecting TagsService
     * @constructor
     * */
    private readonly tagsService: TagsService,

    /**
     * Injecting UserService
     * @service
     * */
    private readonly userService: UsersService,

    /**
     * Injecting PaginationProvider
     * @provider
     * */
    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Gets post related tags
   * */
  public async getAllTags() {
    let postTags = undefined;

    try {
      postTags = await this.db
        .select({
          id: post.id,
          title: post.title,
          tags: sql`
        json_agg(
          json_build_object(
            'id', tag.id,
            'name', tag.name,
            'slug', tag.slug,
            'description', tag.description,
            'schema', tag.schema
          )
        )
      `,
        })
        .from(post)
        .leftJoin(postTagsTag, eq(postTagsTag.postId, post.id))
        .leftJoin(tag, eq(postTagsTag.tagId, tag.id))
        .groupBy(post.id);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later ', {
        description: 'Erorr connecting to database.',
      });
    }

    return postTags;
  }

  /**
   * If metaOptions is provided, Creates a new meta option before creating a new blog post
   * Creates a new blog post
   * If metaOptions is provided, Assigns metaOptions to the new blog post
   *
   * @method to create a new blog
   * @returns response of created blog post
   * */
  public async create(@Body() createPostDto: CreatePostDto) {
    // find author from database by authorId

    let author: undefined | User = undefined;
    author = await this.userService.findOneById(createPostDto.authorId);

    /**
     * Handling user does not exist
     * */
    if (!author) {
      throw new BadRequestException('The user does not exist, please check your id.');
    }

    // finds the tags
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    let metaOption: MetaOption | null;
    let newPost = this.postsRepository.create({ ...createPostDto, author, tags });

    try {
      newPost = await this.postsRepository.save(newPost);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment, please try again.', {
        description: 'Error creating post',
      });
    }

    if (newPost) {
      metaOption = this.metaOptionsRepository.create(createPostDto.metaOptions);
      metaOption.post = newPost;

      try {
        await this.metaOptionsRepository.save(metaOption);
      } catch (error) {
        throw new RequestTimeoutException('Unable to process the request, please try again.', {
          description: 'Error creating metaOption',
        });
      }
    }

    return {
      message: 'Blog post created successfully',
      newPost,
    };
  }

  /**
   * Find all blog posts
   * @method to find all blog posts
   * */
  public async findAll(postQuery: GetPostsDto) {
    const results = this.paginationProvider.paginateQuery<Post>(postQuery, this.postsRepository);
    return results;
  }

  /**
   * @method
   *
   * Updates a blog post as follows:
   * 1. Find the Tags of the blog post
   * 2. Find the Post
   * 3. Update the Post
   * 4. Assign the Tags to posts
   * 5. Save the post and return response
   * */
  public async update(patchPostDto: PatchPostDto) {
    // getting existing tags
    let tags: Tag[];

    if (patchPostDto.tags) {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    }

    /**
     * Number of tags should be equal
     * */
    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException('Please check your tag Ids and ensure they are correct.');
    }

    // getting post's detail based on the post id.
    let post: undefined | Post = undefined;

    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process the request, please try again.', {
        description: 'Error connecting with database.',
      });
    }

    if (!post) {
      throw new BadRequestException('The post does not exist, please check your id.');
    }

    // updating post properties
    post.title = patchPostDto.title ?? post.title;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.schema = patchPostDto.schema ?? post.schema;
    post.postType = patchPostDto.postType ?? post.postType;
    post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // assigning tags to post object
    post.tags = tags;

    // saves the posts
    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process the request, please try again.', {
        description: 'Unable connecting with database.',
      });
    }

    // returns the post in response
    return { message: 'updated the posts successfully.', post };
  }

  /**
   * Deletes a blog post by its ID.
   *
   * This method first checks if the blog post exists,
   * then deletes the post if it is found.
   * If the operation is successful, it returns a success message.
   *
   * @async
   * @param {number} id - The ID of the blog post to delete.
   * @throws {RequestTimeoutException} If there is an issue connecting to the database.
   */

  public async delete(id: number) {
    try {
      await this.postsRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process the request, please try again.', {
        description: 'Error connecting with database.',
      });
    }
    return { message: 'Post has been deleted', deleted: true };
  }

  /**
   * Delete all blogs or in bulk
   * @async
   * */
  public async deleteAll() {
    return { message: 'Deleted all posts successfully.', deleted: true };
  }
}
