import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

/**
 * created a post service
 * @class
 */
@Injectable()
export class PostsService {
  constructor(
    /**
     * Injected Users Service
     * @constructor
     */
    private readonly userService: UsersService,
  ) { }

  /**
   * created a method findAll which finds all posts detail
   * @function
   */
  findAll(userId: number) {
    /**
     * Injected user service findone method to find user detail
     * based on their id.
     * @function
     */
    const user = this.userService.findOne(userId);

    if (!user) {
      return {
        message: 'Unauthorized user',
      };
    }

    return {
      message: 'Authorized user',
    };
  }
}
