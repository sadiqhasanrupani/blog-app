import { Body, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { eq } from 'drizzle-orm';

import { DrizzleDB } from 'src/drizzle/types/drizzle';

// tables
import { metaOption, post } from 'src/drizzle/schema/schema';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';

// others
import { CreatePostDto } from '../dtos/create-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';

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
    public readonly metaOptionsRepository: Repository<MetaOption>,
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
    let metaOption: MetaOption | null;
    let newPost = this.postsRepository.create(createPostDto);

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
    const posts = await this.db
      .select({ postId: post.id, title: post.title })
      .from(metaOption)
      .innerJoin(post, eq(post.id, metaOption.postId));

    return {
      message: 'Blog posts fetched successfully',
      posts,
    };
  }

  /**
   * Checks if blog post exists
   * Deletes the post if the blog post exists
   * returns a message of successful deletion
   * @method to delete a blog post
   * */
  public async delete(id: number) {
    // const posts = await this.db
    //   .select({ id: post.id, metaOptionId: metaOption.id })
    //   .from(metaOption)
    //   .innerJoin(post, eq(post.id, metaOption.postId))
    //   .where(eq(post.id, id));
    //
    // const existingPost = posts[0];
    //
    // if (!existingPost) {
    //   return {
    //     message: 'Blog post not found',
    //   };
    // }

    await this.postsRepository.delete(id);
    return { message: 'Post has been deleted' };
  }

  /**
   * Delete all blogs or in bulk
   * @method to delete all blog posts
   * */
  public async deleteAll() {}
}
