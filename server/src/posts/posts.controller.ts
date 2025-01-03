import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostsService } from './providers/posts.service';

import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { DeletePostParamDto } from './dtos/delete-post-param.dto';

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
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  /**
   * creates a new blog post
   * @methods
   * @controller
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
    return this.postsService.create(createPostDto);
  }

  /**
   * @method that will update a existing post
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
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  /**
   * Delete a blog post
   * @controller to delete multiple or single blog post
   * */
  @Delete('/:id?')
  public deletePost(@Param() deletePostParamDto: DeletePostParamDto) {
    if (deletePostParamDto.id) {
      return this.postsService.delete(deletePostParamDto.id);
    }

    return this.postsService.deleteAll();
  }
}
