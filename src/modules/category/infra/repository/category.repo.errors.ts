/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */

import { DomainError } from '../../../../shared/core/domain/domain-errors';

export type ICategoryRepoErrors =
  | CategoryRepoErrors.InvalidCategoryInfoError
  | CategoryRepoErrors.CategoryGenericError;

export namespace CategoryRepoErrors {
  export class InvalidCategoryInfoError extends DomainError {
    public constructor(fieldName: string) {
      super(fieldName);
    }

    public static create(fieldName: string): InvalidCategoryInfoError {
      const propNameOrDefaultError = fieldName || 'Some field is invalid';
      return new InvalidCategoryInfoError(propNameOrDefaultError);
    }
  }

  export class CategoryGenericError extends DomainError {
    public constructor(value: string) {
      super(value);
    }

    public static create(errorValue: string): CategoryGenericError {
      return new CategoryGenericError(errorValue);
    }
  }
}
