import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTagDto } from 'src/tags/dtos/create-tags.dto';

import { Tag } from '../tag.entity';
import { info } from 'console';

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

    try {
      createTag = await this.tagRepository.save(createTag);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later ', {
        description: 'Erorr connecting to database.',
      });
    }

    return { message: 'Tag created successfully', createTag };
  }

  /**
   * findAll method
   * @service to find all tags
   * */
  public async findAll() {
    let tags: undefined | Tag[] = undefined;

    try {
      tags = await this.tagRepository.find();
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later ', {
        description: 'Erorr connecting to database.',
      });
    }

    return { message: 'Tags fetched successfully', tags };
  }

  /**
   * findMultipleTags method
   * @service to find multiple tags
   * @exceptions are handled here.
   */
  public async findMultipleTags(tags: number[]) {
    let getSelectedTags = undefined;

    if (tags.length === 0) {
      throw new BadRequestException('No tags selected');
    }

    try {
      getSelectedTags = await this.tagRepository.find({
        where: {
          id: In(tags),
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later ', {
        description: 'Erorr connecting to database.',
      });
    }

    return getSelectedTags;
  }

  /**
   * deleted a tag by id
   * @service to delete a tag
   * */
  public async delete(id: number) {
    try {
      await this.tagRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later ', {
        description: 'Erorr connecting to database.',
      });
    }

    return { deleted: true, id };
  }

  /**
   * soft remove a tag by id
   * @service to delete a tag
   * */
  public async softDelete(id: number) {
    try {
      await this.tagRepository.softDelete(id);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later ', {
        description: 'Erorr connecting to database.',
      });
    }

    return { deleted: true, id };
  }
}
