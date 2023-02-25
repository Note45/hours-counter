import { DomainError } from '../../../shared/core/domain/domain-errors';

export type ICategoryError = CategoryError.InvalidCategoryInfoError;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CategoryError {
  export class InvalidCategoryInfoError extends DomainError {
    public constructor(propName: string) {
      super(`${propName} invalid!`);
    }

    public static create(fieldName?: string): InvalidCategoryInfoError {
      const propNameOrDefaultError = fieldName || 'Some property is';
      return new InvalidCategoryInfoError(propNameOrDefaultError);
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
