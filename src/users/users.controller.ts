import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';

import { Request } from 'express';
import { Gender, UsersService } from './users.service';
import { CreateUserDto, UserBody } from './dtos/create-user.dto';

type GetUserQuery = {
  name: string;
  age: number;
};

type PutUserbody = {
  age: number;
  gender: Gender;
};

const users: UserBody[] = [
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  public getUsers(@Query() query: GetUserQuery) {
    const response = this.usersService.getUsers(query, users);

    return response;
  }

  @Get('/:id')
  public getUser(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'User got successfully',
      user: users.find((user) => user.id === id),
    };
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    users.push(createUserDto);

    return {
      message: 'User created successfully',
      users,
    };
  }

  @Put('/:name')
  public updateUser(
    @Req() request: Request,
    @Param('firstName') firstName: string,
  ) {
    const body: PutUserbody = request.body;

    users.forEach((user, index) => {
      if (user.firstName === firstName) {
        users[index] = {
          ...user,
          ...body,
        };
      }
    });

    return {
      message: 'User updated successfully',
      users,
    };
  }
}
