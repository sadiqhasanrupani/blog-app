import { Body, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { DrizzleDB } from 'src/drizzle/types/drizzle';

// tables
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';

// others
import { CreatePostDto } from '../dtos/create-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Tag } from 'src/tags/tag.entity';

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
  ) {}

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
    const author = await this.userService.findOneById(1);
    if (!author) {
      return { message: "User doesn't exist" };
    }

    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    let metaOption: MetaOption | null;
    let newPost = this.postsRepository.create({ ...createPostDto, author, tags });

    newPost = await this.postsRepository.save(newPost);

    if (newPost) {
      metaOption = this.metaOptionsRepository.create(createPostDto.metaOptions);
      metaOption.post = newPost;
      await this.metaOptionsRepository.save(metaOption);
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
  public async findAll() {
    const posts = await this.postsRepository.find({ relations: { author: true, metaOptions: true, tags: true } });

    return {
      message: 'Blog posts fetched successfully',
      posts,
    };
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

    // getting post's detail based on the post id.
    let post = await this.postsRepository.findOneBy({ id: patchPostDto.id });

    if (!post) {
      return { message: "Post doesn't exist" };
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
    post = await this.postsRepository.save(post);

    // returns the post in response
    return { message: 'updated the posts successfully.', post };
  }

  /**
   * Checks if blog post exists
   * Deletes the post if the blog post exists
   * returns a message of successful deletion
   * @method to delete a blog post
   * */
  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { message: 'Post has been deleted' };
  }

  /**
   * Delete all blogs or in bulk
   * @method to delete all blog posts
   * */
  public async deleteAll() {}
}
