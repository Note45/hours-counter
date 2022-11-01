import { IsNotEmpty, IsDefined, IsString } from 'class-validator';

export class GetUserInfosDTO {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  userId: string;
}
