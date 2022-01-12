import { UniqueEntityID } from '../../../shared/utils/unique-entity-id.utils';
import { IPassword } from './password.interface';

export interface IUser {
  id?: UniqueEntityID | string;
  _id?: UniqueEntityID | string;
  name: string;
  email: string;
  phone: string;
  password: string | IPassword;
  createdAt?: Date;
  updatedAt?: Date;
}
