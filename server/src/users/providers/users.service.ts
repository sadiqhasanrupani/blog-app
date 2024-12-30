import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserBody } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    /*
     * Injecting AuthService
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  private users: UserBody[] = [
    {
      firstName: 'Sadiqhasan',
      lastName: 'Rupani',
      email: 'sadiqhasanrupani11@gmail.com',
      password: 'Sadiq@123',
      id: 1,
    },
    {
      firstName: 'Sidika',
      lastName: 'Rupani',
      email: 'sadiqhasanrupani11@gmail.com',
      password: 'Sadiq@123',
      id: 2,
    },
  ];

  public findAll() {
    const isAuth = this.authService.isAuth();
    if (!isAuth) {
      return { message: 'Invalid user' };
    }

    return this.users;
  }

  public findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  public findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
