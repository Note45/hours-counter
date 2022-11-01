import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsEmail()
  @IsString()
  password: string;
}
