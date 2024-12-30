import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostsService } from './providers/posts.service';

import { GetPostsParamDto } from './dtos/get-posts-param.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

/**
 * created a post controller
 * @class
 */
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * created a findAll method that will find all posts based on their id.
   * @function
   */
  @Get('/:userId?')
  findAll(@Param() getPostsParamDto: GetPostsParamDto) {
    return this.postsService.findAll(getPostsParamDto.userId);
  }

  /**
   * created a createPost method that will create a new post
   * @function
   */
  @ApiOperation({
    summary: 'Creates a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'This request returns 201 status when a post created successfully.',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return {
      postPostsBodyDto: createPostDto,
    };
  }

  /**
   * created a patchPost method that will update a existing post
   * @function
   */
  @ApiOperation({
    summary: 'Updates a existing post',
  })
  @ApiResponse({
    status: 200,
    description: 'This request returns 200 status when a post is updated successfully.',
  })
  @Patch()
  public patchPost(@Body() patchPostDto: PatchPostDto) {
    return {
      patchPostDto,
    };
  }
}
