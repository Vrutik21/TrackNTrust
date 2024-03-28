import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';

export class UsersDto {
  @IsEmail()
  email: string;
}

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  mobile: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsEnum(Role)
  role: Role;
}
