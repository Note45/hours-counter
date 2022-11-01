import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../../domain/interfaces/user.interface';
import { UserMapper } from '../../../domain/mapper/user.mapper';
import { User } from '../../../domain/user.domain';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepo, UserResponse } from '../user.repo';
import { UserRepoErrors } from '../user.repo.errors';

@Injectable()
export class UserRepoMongoose implements IUserRepo {
  constructor(
    @InjectModel(UserEntity.name) private UserModel: Model<UserEntity>,
    private userMapper: UserMapper,
  ) {}

  async getUserById(id: string): Promise<UserResponse<User>> {
    const user = await this.UserModel.findById(id);

    if (user) {
      const result = this.userMapper.toDomain({
        ...user.toJSON(),
        id: user.toJSON()._id.toString(),
      } as IUser);

      if (result) return result;
    }

    return UserRepoErrors.UserGenericError.create('User not found!');
  }

  async getUserByEmail(email: string): Promise<UserResponse<User>> {
    const user = await this.UserModel.findOne({ email });

    if (user) {
      const result = this.userMapper.toDomain({
        ...user.toJSON(),
        id: user.toJSON()._id.toString(),
      } as IUser);

      if (result) return result;
    }

    return UserRepoErrors.UserGenericError.create('User not found!');
  }

  async createUser(user: User): Promise<UserResponse<User>> {
    const newUser = await new this.UserModel(
      this.userMapper.toPersistence(user),
    ).save();

    if (newUser) {
      const result = this.userMapper.toDomain({
        ...newUser.toJSON(),
        id: newUser.toJSON()._id.toString(),
      } as IUser);

      if (result) {
        return result;
      }
    }

    return UserRepoErrors.UserGenericError.create(
      'Error when try save user on data base!',
    );
  }
}
