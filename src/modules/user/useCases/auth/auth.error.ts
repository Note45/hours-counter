/* eslint-disable @typescript-eslint/no-namespace */
import { DomainError } from '../../../../shared/core/domain/domain-errors';

export type IAuthErrors = AuthErrors.AuthCredentialsError;

export namespace AuthErrors {
  export class AuthCredentialsError extends DomainError {
    private constructor() {
      super(`Email or password is wrong!`);
    }

    public static create(): AuthCredentialsError {
      return new AuthCredentialsError();
    }
  }
}
