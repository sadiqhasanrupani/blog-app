import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Matches,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: "First name can't be empty" })
  @MinLength(3, { message: 'First name must be at least 3 characters' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  @MinLength(3, { message: 'Last name must be at least 3 characters' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: "Email can't be empty" })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number or special character',
  })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export type UserBody = CreateUserDto;
