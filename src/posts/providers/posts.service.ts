import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injected Users Service
     */
    private readonly userService: UsersService,
  ) { }

  findAll(userId: number) {
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
