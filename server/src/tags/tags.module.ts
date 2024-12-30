import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsController } from './tags.controller';
import { Tags } from './tag.entity';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tags])],
})
export class TagsModule {}
