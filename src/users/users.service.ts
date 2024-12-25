import { Injectable } from '@nestjs/common';
import { UserBody } from './dtos/create-user.dto';

export type Gender = 'male' | 'female';

type GetUserQuery = {
  name: string;
  age: number;
};

@Injectable()
export class UsersService {
  public getUsers(query: GetUserQuery, users: UserBody[]) {
    console.log('query: ', query);

    return {
      message: 'All users got successfully',
      users,
    };
  }
}
