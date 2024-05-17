import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
