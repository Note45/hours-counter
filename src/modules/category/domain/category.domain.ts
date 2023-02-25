import { Entity } from '../../../shared/core/domain/entity';
import { Guard } from '../../../shared/utils/guard.utils';
import { UniqueEntityID } from '../../../shared/utils/unique-entity-id.utils';
import { CategoryError, ICategoryError } from './category.domain.errors';
import { ICategory } from './interfaces/category.interface';

export type ICategoryProps = ICategory;

export type CategoryType = Category | ICategoryError;

export class Category extends Entity<ICategoryProps> {
  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: ICategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ICategoryProps, id?: UniqueEntityID): CategoryType {
    const guardedProps = [
      { argument: props.userId, argumentName: 'userId' },
      { argument: props.name, argumentName: 'name' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return new CategoryError.InvalidCategoryInfoError(
        guardResult?.message || '',
      );
    }

    return new Category(props, new UniqueEntityID(id));
  }
}
