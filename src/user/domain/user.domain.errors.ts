/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */

import { DomainError } from '../../shared/core/domain/domain-errors';

export type IUserError =
  | UserError.InvalidUserInfoError
  | UserError.GenericMessageError;

export namespace UserError {
  export class InvalidUserInfoError extends DomainError {
    public constructor(propName: string) {
      super(`${propName} inválido(a)!`);
    }

    public static create(fieldName?: string): InvalidUserInfoError {
      const propNameOrDefaultError = fieldName || 'Alguma propriedade está';
      return new InvalidUserInfoError(propNameOrDefaultError);
    }
  }

  export class GenericMessageError extends DomainError {
    public constructor(message: string) {
      super(message);
    }

    public static create(message: string): GenericMessageError {
      return new GenericMessageError(message);
    }
  }
}
