import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

import { PaginationQueryDto } from '../dtos/pagination-query.dto';

/**
 * A @Injectable pagination service for pagination operation in common
 * */
@Injectable()
export class PaginationProvider {
  /**
   * A paginate Query for all paginated routes
   * */
  public async paginateQuery<T extends ObjectLiteral>(paginationQuery: PaginationQueryDto, repository: Repository<T>) {
    const { limit, page } = paginationQuery;
    const results = repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    return results;
  }
}
