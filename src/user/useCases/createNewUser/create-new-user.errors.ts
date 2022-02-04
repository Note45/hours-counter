/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { DomainError } from '../../../shared/core/domain/domain-errors';

export type ICreateNewUserError =
  | CreateNewUserError.AlreadyRegisteredUser
  | CreateNewUserError.InvalidParamError
  | CreateNewUserError.OnDatabaseCreateNewUserError;

export namespace CreateNewUserError {
  export class AlreadyRegisteredUser extends DomainError {
    public constructor() {
      super('User is already registered!');
    }

    public static create(): AlreadyRegisteredUser {
      return new AlreadyRegisteredUser();
    }
  }

  export class InvalidParamError extends DomainError {
    public constructor(propName: string) {
      super(`Parameter ${propName} is invalid!`);
    }

    public static create(fieldName: string): InvalidParamError {
      return new InvalidParamError(fieldName);
    }
  }

  export class OnDatabaseCreateNewUserError extends DomainError {
    public constructor(error: string) {
      super(`Error create user: ${error}`);
    }

    public static create(error: string): OnDatabaseCreateNewUserError {
      return new OnDatabaseCreateNewUserError(error);
    }
  }
}
