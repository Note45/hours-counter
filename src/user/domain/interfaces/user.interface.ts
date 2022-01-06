import { UniqueEntityID } from '../../../shared/utils/unique-entity-id.utils';

export interface IUser {
  id?: UniqueEntityID | string;
  _id?: UniqueEntityID | string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
