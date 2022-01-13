import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../domain/user.domain';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepo, UserResponse } from '../user.repo';

@Injectable()
export class UserRepoMongoose implements IUserRepo {
  constructor(
    @InjectModel(UserEntity.name) private UserModel: Model<UserEntity>,
  ) {}

  async getClienteById(id: string): Promise<UserResponse<User>> {
    // implement method

    return { id } as unknown as User;
  }

  async createCliente(user: User): Promise<UserResponse<User>> {
    // implement method

    return user;
  }
}
