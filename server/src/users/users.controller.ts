import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './providers/users.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

/**
 * created a user controller
 * @class
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * created a user function that will fetch all the users
   * @function
   */
  @Get('/:id?')
  @ApiOperation({ summary: 'Fetches a list of registered users on the application.' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully based on the documentation' })
  @ApiResponse({ status: 400, description: 'Invalid user id will hit a based request' })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The position of the page number that you want the API to return',
    example: 1,
  })
  public getUsers(
    @Param() params: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    if (params.id) {
      return this.usersService.findOneById(params.id);
    }

    const response = this.usersService.findAll();
    return response;
  }

  /**
   * created a user function that will create a new user
   * @function
   */
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    const response = this.usersService.createUser(createUserDto);

    return response;
  }

  /**
   * created a user function that will update a user
   * @function
   */
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return {
      message: 'User updated successfully',
      patchUserDto,
    };
  }
}
