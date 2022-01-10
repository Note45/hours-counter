/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */

import { DomainError } from '../../shared/core/domain/domain-errors';

export type IUserError = UserError.InvalidUserInfoError;

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
}
