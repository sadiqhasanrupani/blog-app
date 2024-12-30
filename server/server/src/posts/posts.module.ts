import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';

import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';

@Module({
  imports: [UsersModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostModule { }
