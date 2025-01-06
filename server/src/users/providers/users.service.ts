import {
  Injectable,
  Inject,
  forwardRef,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user.entity';

import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

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
    private readonly userRepository: Repository<User>,

    /**
     * Inject CreateUsersManyProvider
     * */
    private readonly createUsersManyProvider: UsersCreateManyProvider,
  ) {}

  /**
   * 1. Checks for existing user with same email
   * 2. Throw an exception error if the user exists or other exception occurs
   * 3. Creates a new user
   * @function
   * */
  public async create(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      existingUser = await this.userRepository.find({
        select: ['email', 'id'],
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later ', {
        description: 'Erorr connecting to database.',
      });
    }

    /**
     * Handle user does not exists
     */
    if (existingUser.length > 0) {
      throw new BadRequestException('The user already exists, please check your email.');
    }

    let newUser = this.userRepository.create(createUserDto);
    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later', {
        description: 'Error creating user',
      });
    }

    return { message: 'User created successfully', newUser };
  }

  /**
   * created a method findAll which finds all users detail
   * @function
   */
  public async findAll() {
    const isAuth = this.authService.isAuth();
    if (!isAuth) {
      return { message: 'Unauthorized User' };
    }

    let users: undefined | User[];

    try {
      users = await this.userRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unable to process at the moment please try later',
          message: 'Something went wrong please try again later.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { description: error.message, cause: error },
      );
    }

    return users;
  }

  /**
   * created a method findOne which finds one user detail based on their correct id.
   * @function to get user by ID.
   * @exceptions are handled here.
   */
  public async findOneById(id: number) {
    let user: undefined | User;

    try {
      user = await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later', {
        description: 'Erorr connecting to database.',
      });
    }

    /**
     * Handle user does not exists
     */
    if (!user) {
      throw new BadRequestException('The user does not exist, please check your id.');
    }

    return user;
  }

  /**
   * created a method findOne which finds one user detail based on their correct email id.
   * @function to get user by EmailId.
   * @returns false | Promise<User>
   */
  public async findOneByEmail(email: string) {
    let user: User | undefined;

    try {
      user = await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process at the moment please try later', {
        description: 'Erorr connecting to database.',
      });
    }

    /**
     * Handle user does not exists
     */
    if (!user) {
      throw new BadRequestException('The user does not exist, please check your email.');
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const createdUsers = await this.createUsersManyProvider.createMany(createManyUsersDto.users);
    return { message: 'Users created successfully', users: createdUsers };
  }
}
