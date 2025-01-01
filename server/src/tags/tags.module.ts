import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsController } from './tags.controller';
import { Tag } from './tag.entity';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
