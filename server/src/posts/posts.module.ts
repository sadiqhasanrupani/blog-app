import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';

import { UsersModule } from 'src/users/users.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';

/**
 * created a post module
 * @class
 */
@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post, MetaOption]), DrizzleModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostModule { }
