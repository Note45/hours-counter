/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */

import { DomainError } from '../../../../shared/core/domain/domain-errors';

export type IUserRepoErrors =
  | UserRepoErrors.InvalidUserInfoError
  | UserRepoErrors.UserGenericError;

export namespace UserRepoErrors {
  export class InvalidUserInfoError extends DomainError {
    public constructor(fieldName: string) {
      super(fieldName);
    }

    public static create(fieldName: string): InvalidUserInfoError {
      const propNameOrDefaultError = fieldName || 'Some field is invalid';
      return new InvalidUserInfoError(propNameOrDefaultError);
    }
  }

  export class UserGenericError extends DomainError {
    public constructor(value: string) {
      super(value);
    }

    public static create(errorValue: string): UserGenericError {
      return new UserGenericError(errorValue);
    }
  }
}
