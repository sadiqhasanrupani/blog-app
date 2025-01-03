import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsController } from './tags.controller';
import { Tag } from './tag.entity';
import { TagsService } from './providers/tags.service';

/**
 * Tag Module
 * @module
 * */
@Module({
  exports: [TagsService],
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule { }
