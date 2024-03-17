import { IsEmail } from 'class-validator';

export class UsersDto {
  @IsEmail()
  email: string;
}
