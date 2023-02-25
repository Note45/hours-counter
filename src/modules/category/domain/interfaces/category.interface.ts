import { UniqueEntityID } from '../../../../shared/utils/unique-entity-id.utils';

export interface ICategory {
  id?: UniqueEntityID;
  _id?: UniqueEntityID | string;
  userId: UniqueEntityID;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
