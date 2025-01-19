import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';

import { UsersModule } from 'src/users/users.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

/**
 * created a post module
 * @class
 */
@Module({
  imports: [UsersModule, TagsModule, TypeOrmModule.forFeature([Post, MetaOption]), DrizzleModule, PaginationModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostModule {}
