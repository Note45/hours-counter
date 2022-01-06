import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '../../utils/unique-entity-id.utils';

// eslint-disable-next-line no-use-before-define
const isEntity = (v: any): v is Entity<any> => v instanceof Entity;

@Injectable()
export abstract class Entity<T = any> {
  protected readonly _id: UniqueEntityID;

  public readonly props: T;

  constructor(props: T, id = new UniqueEntityID()) {
    this._id = id;
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object === undefined) return false;

    if (this === object) return true;

    if (!isEntity(object)) return false;

    return this._id.equals(object._id);
  }
}
