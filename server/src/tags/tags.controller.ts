import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateTagDto } from './dtos/create-tags.dto';

import { TagsService } from './providers/tags.service';

/**
 * Tag Controller
 * @controller
 * */
@Controller('tags')
export class TagsController {
  constructor(
    /**
     * Injecting TagsService
     * @property
     * */
    private readonly tagsService: TagsService,
  ) {}

  /**
   * createTag method
   * @controller to create a new tag
   */
  @ApiOperation({
    summary: 'Creates a new tag',
  })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully.',
  })
  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({ summary: 'Gets all tags' })
  @ApiResponse({ status: 200, description: 'All tags got successfully.' })
  @Get()
  public findAll() {
    return this.tagsService.findAll();
  }
}
