import { UniqueEntityID } from '../../../../shared/utils/unique-entity-id.utils';

export interface ICategory {
  id?: UniqueEntityID | string;
  _id?: UniqueEntityID | string;
  userId: UniqueEntityID | string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
