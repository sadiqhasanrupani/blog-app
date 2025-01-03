import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTagDto } from 'src/tags/dtos/create-tags.dto';

import { Tag } from '../tag.entity';

/**
 * Tag Service
 * @service
 * */
@Injectable()
export class TagsService {
  constructor(
    /**
     * Injecting TagRepository
     * @repository
     * */
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  /**
   * createTag method
   * @service to create tag
   */
  public async create(createTagDto: CreateTagDto) {
    let createTag = this.tagRepository.create(createTagDto);
    createTag = await this.tagRepository.save(createTag);

    return { message: 'Tag created successfully', createTag };
  }

  public async findAll() {
    const tags = await this.tagRepository.find();
    return { message: 'Tags fetched successfully', tags };
  }

  public async findMultipleTags(tags: number[]) {
    const getSelectedTags = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return getSelectedTags;
  }
}
