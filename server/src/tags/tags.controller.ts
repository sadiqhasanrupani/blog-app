import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from './dtos/create-tags.dto';
import { TagsService } from './providers/tags.service';

/**
 * Tag Controller
 * @controller
 * */
@Controller('tags')
@ApiTags('tags')
export class TagsController {
  constructor(
    /**
     * Injecting TagsService
     * @property
     * */
    private readonly tagsService: TagsService,
  ) { }

  /**
   * createTag method
   * @controller to create a new tag
   */
  @ApiOperation({ summary: 'Creates a new tag' })
  @ApiResponse({
    status: 201,
    description: 'Tag created successfully.',
  })
  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  /**
   * @method to findAll tags
   * @returns all tags
   * */
  @ApiOperation({ summary: 'Gets all tags' })
  @ApiResponse({ status: 200, description: 'All tags got successfully.' })
  @Get()
  public findAll() {
    return this.tagsService.findAll();
  }

  /**
   * @method to find tag by id
   * @returns deleted tag by id
   * */
  @ApiOperation({ summary: 'Deletes a tag' })
  @ApiResponse({ status: 200, description: 'Tag deleted successfully.' })
  @ApiQuery({ name: 'id', type: Number, example: 1, description: 'Tag id' })
  @Delete()
  public delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  /**
   * @method to soft delete tag
   * @controller
   * */
  @ApiOperation({ summary: 'Soft Deletes a tag' })
  @ApiResponse({ status: 200, description: 'Deleted successfully but not from database.' })
  @Delete('soft-delete')
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softDelete(id);
  }
}
