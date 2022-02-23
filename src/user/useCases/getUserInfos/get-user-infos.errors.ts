/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { DomainError } from '../../../shared/core/domain/domain-errors';

export type IGetUserInfosErrorError = GetUserInfoErrors.GetUserInfosError;

export namespace GetUserInfoErrors {
  export class GetUserInfosError extends DomainError {
    public constructor(error: string) {
      super(`Error when try get user infos: ${error}`);
    }

    public static create(error: string): GetUserInfosError {
      return new GetUserInfosError(error);
    }
  }
}
