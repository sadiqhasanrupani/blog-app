import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MetaOptionsService } from './providers/meta-options.service';

import { CreateMetaOptionsDto } from './dtos/create-meta-options.dto';

/**
 * MetaOptions Controller
 * @class
 * */
@Controller('meta-options')
@ApiTags('Meta Options')
export class MetaOptionsController {
  constructor(
    /**
     * Injecting the MetaOptionsService
     * @property
     * */
    private readonly metaOptionsService: MetaOptionsService,
  ) {}

  /**
   * This method creates new meta option
   * @method
   * @returns a response
   * */
  @ApiOperation({
    summary: 'Creates a new meta option',
  })
  @ApiResponse({
    status: 201,
    description: 'Meta option created successfully',
  })
  @Post()
  public createMetaOptions(@Body() createMetaOptionsDto: CreateMetaOptionsDto) {
    return this.metaOptionsService.create(createMetaOptionsDto);
  }
}
