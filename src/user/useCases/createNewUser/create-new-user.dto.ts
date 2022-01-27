import { IsEmail, IsNotEmpty, IsDefined, IsString } from 'class-validator';

export class CreateNewUserDTO {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;

  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsDefined()
  @IsEmail()
  @IsString()
  password: string;
}
