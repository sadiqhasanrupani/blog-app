import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostsService } from './providers/posts.service';
import { GetPostsParamDto } from './dtos/get-posts-param.dto';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  findAll(@Param() getPostsParamDto: GetPostsParamDto) {
    return this.postsService.findAll(getPostsParamDto.userId);
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return {
      postPostsBodyDto: createPostDto,
    };
  }
}
