import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class CreateManyUsersDto {
  @ApiProperty({
    name: 'users',
    description: 'An array of users',
    type: [CreateUserDto],
    items: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: 'First name of the user',
          example: 'John',
        },
        lastName: {
          type: 'string',
          description: 'Last name of the user (optional)',
          example: 'Doe',
          nullable: true,
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email of the user',
          example: 'john.doe@example.com',
        },
        password: {
          type: 'string',
          description: 'Password for the user account',
          example: 'P@ssw0rd123',
          minLength: 8,
        },
        id: {
          type: 'number',
          description: 'Unique identifier for the user',
          example: 1,
        },
      },
    },
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
