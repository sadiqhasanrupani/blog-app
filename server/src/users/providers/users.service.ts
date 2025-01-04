import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { User } from '../user.entity';

import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * created a user service
 * @class
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting ConfigService
     * @property
     * */
    private readonly configService: ConfigService,

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
  ) { }

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
  public async findAll() {
    const DatabaseUrl = this.configService.get<string>('DATABASE_URL');
    console.log(DatabaseUrl);

    const isAuth = this.authService.isAuth();
    if (!isAuth) {
      return { message: 'Unauthorized User' };
    }

    const users = await this.userRepository.find();
    return users;
  }

  /**
   * created a method findOne which finds one user detail based on their correct id.
   * @function to get user by ID.
   * @returns false | Promise<User>
   */
  public async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return false;
    }

    return user;
  }

  /**
   * created a method findOne which finds one user detail based on their correct email id.
   * @function to get user by EmailId.
   * @returns false | Promise<User>
   */
  public async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return false;
    }

    return user;
  }
}
