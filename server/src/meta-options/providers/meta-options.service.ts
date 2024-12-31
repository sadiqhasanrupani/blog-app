import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMetaOptionsDto } from '../dtos/create-meta-options.dto';
import { MetaOption } from '../meta-option.entity';

/**
 * A service for handling business logic related to meta options.
 * @class
 * @constructor
 * @public
 */
@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * The repository for meta options.
     * @property
     * */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  /**
   * Create a new meta option.
   * @method
   * @returns
   */
  public async create(createMetaOptionDto: CreateMetaOptionsDto) {
    let newMetaOption = this.metaOptionRepository.create(createMetaOptionDto);
    newMetaOption = await this.metaOptionRepository.save(newMetaOption);

    return {
      message: 'Meta option created successfully',
      newMetaOption,
    };
  }
}
