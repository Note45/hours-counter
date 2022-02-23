import * as mongoose from 'mongoose';
import { Identifier } from './identifier';

// eslint-disable-next-line no-use-before-define
export type IdTypes = string | UniqueEntityID | mongoose.Types.ObjectId;

const isObjectId = (id: any) => id instanceof mongoose.Types.ObjectId;
// eslint-disable-next-line no-use-before-define
const isUniqueId = (id: any) => id instanceof UniqueEntityID;

export class UniqueEntityID extends Identifier<string> {
  constructor(id: IdTypes = String(new mongoose.Types.ObjectId())) {
    if (isObjectId(id)) {
      super(String(id));
    } else if (isUniqueId(id)) {
      super(id.toString());
    } else if (typeof id === 'string') {
      super(id);
    }
  }

  public static validate(id: string) {
    return !!mongoose.Types.ObjectId.isValid(id);
  }

  toObjectID(): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(this.toString());
  }
}
