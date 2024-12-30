import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostsService } from './providers/posts.service';

import { GetPostsParamDto } from './dtos/get-posts-param.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  findAll(@Param() getPostsParamDto: GetPostsParamDto) {
    return this.postsService.findAll(getPostsParamDto.userId);
  }

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
