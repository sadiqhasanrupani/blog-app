import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetaOptionsController } from './meta-options.controller';
import { MetaOptions } from './meta-option.entity';

@Module({
  controllers: [MetaOptionsController],
  imports: [TypeOrmModule.forFeature([MetaOptions])],
})
export class MetaOptionsModule {}
