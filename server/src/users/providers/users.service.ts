import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user.entity';

import { CreateUserDto, UserBody } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * created a user service
 * @class
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting AuthService
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * Injecting UserRepository
     * */
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 1. Checks for existing user with same email
   * 2. Throw an exception error if the user exists or other exception occurs
   * 3. Creates a new user
   * @function
   * */
  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.find({
      select: ['email', 'id'],
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser.length > 0) {
      return { message: 'User already exists' };
    }

    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return { message: 'User created successfully', newUser };
  }

  /**
   * created a method findAll which finds all users detail
   * @function
   */
  public findAll() {
    const isAuth = this.authService.isAuth();
    if (!isAuth) {
      return { message: 'Invalid user' };
    }

    return [];
  }

  /**
   * created a method findOne which finds one user detail based on their correct id.
   * @function
   */
  public findOne(id: number) {
    return [];
  }

  /**
   * created a method findOne which finds one user detail based on their correct email id.
   * @function
   */
  public findOneByEmail(email: string) {
    return [];
  }
}
