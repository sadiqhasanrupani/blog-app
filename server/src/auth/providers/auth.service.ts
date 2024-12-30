import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    /*
     * Injecting UserService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public login(email: string, password: string) {
    const isUser = this.userService.findOneByEmail(email);

    if (!isUser) {
      return { message: 'Credentials are invalid' };
    }

    return { message: 'Logged in successfully.', token: 'SECRET_TOKEN' };
  }

  public isAuth() {
    return true;
  }
}
