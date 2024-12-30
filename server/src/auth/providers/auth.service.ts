import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

/**
 * created a auth service
 * @class
 */
@Injectable()
export class AuthService {
  constructor(
    /*
     * Injecting UserService
     * @constructor
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) { }

  /**
   * created a login method to login application users
   * @function
   */
  public login(email: string, _: string) {
    const isUser = this.userService.findOneByEmail(email);

    if (!isUser) {
      return { message: 'Credentials are invalid' };
    }

    return { message: 'Logged in successfully.', token: 'SECRET_TOKEN' };
  }

  /**
   * created a isAuth method to authenticate application users
   * @function
   */
  public isAuth() {
    return true;
  }
}
