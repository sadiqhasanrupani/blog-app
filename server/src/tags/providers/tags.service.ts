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
  ) { }

  /**
   * createTag method
   * @service to create tag
   */
  public async create(createTagDto: CreateTagDto) {
    let createTag = this.tagRepository.create(createTagDto);
    createTag = await this.tagRepository.save(createTag);

    return { message: 'Tag created successfully', createTag };
  }

  /**
   * findAll method
   * @service to find all tags
   * */
  public async findAll() {
    const tags = await this.tagRepository.find();
    return { message: 'Tags fetched successfully', tags };
  }

  /**
   * findMultipleTags method
   * @service to find multiple tags
   * */
  public async findMultipleTags(tags: number[]) {
    const getSelectedTags = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return getSelectedTags;
  }

  /**
   * deleted a tag by id
   * @service to delete a tag
   * */
  public async delete(id: number) {
    await this.tagRepository.delete(id);

    return { deleted: true, id };
  }

  /**
   * soft remove a tag by id
   * @service to delete a tag
   * */
  public async softDelete(id: number) {
    await this.tagRepository.softDelete(id);

    return { deleted: true, id };
  }
}
