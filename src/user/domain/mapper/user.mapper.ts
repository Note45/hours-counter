import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '../../../shared/utils/unique-entity-id.utils';
import { IUser } from '../interfaces/user.interface';
import { User, UserType } from '../user.domain';

export interface IUserPesistence extends Omit<IUser, 'password' | 'id'> {
  password: string;
}

@Injectable()
export class UserMapper {
  public toPersistence(user: User): IUserPesistence {
    const payload: IUserPesistence = {
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password.toString(),
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    if (user.password && user.password.hashed) {
      payload.password = user.password.value;
    }

    return payload;
  }

  public toDomain(raw: IUser): UserType {
    if (typeof raw.id === 'string' || typeof raw._id === 'string') {
      // eslint-disable-next-line no-param-reassign
      raw.id = new UniqueEntityID(raw.id || raw._id);
      // eslint-disable-next-line no-param-reassign
      raw._id = new UniqueEntityID(raw.id || raw._id);
    }

    return User.create(raw, raw.id || raw._id);
  }

  public toDTO(user: User): Omit<IUser, 'password' | '_id'> {
    const {
      _id,
      password: _password,
      ...clientePersistence
    } = this.toPersistence(user);

    const userDTO = { ...clientePersistence, id: _id };

    return userDTO;
  }
}
