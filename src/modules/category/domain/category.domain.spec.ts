import { ICategory } from './interfaces/category.interface';
import { Category } from './category.domain';
import { ICategoryError, CategoryError } from './category.domain.errors';
import { UniqueEntityID } from '../../../shared/utils/unique-entity-id.utils';

const describeBaseTest = 'test domain category';
const describeFailedTest = 'test domain erros category';

describe(describeBaseTest, () => {
  it('should be able to create a category', () => {
    const categoryProps = {
      name: 'Test Name',
      userId: new UniqueEntityID('category-test-id'),
    };

    const categoryCreated = Category.create(categoryProps) as Category;

    expect(categoryCreated).toBeDefined();
    expect(categoryCreated.name).toEqual(categoryProps.name);
    expect(categoryCreated.userId).toEqual(categoryProps.userId);
  });
});

describe(describeFailedTest, () => {
  it('should be able to test error invalid name', () => {
    const CategoryCreated = Category.create({
      userId: new UniqueEntityID('category-test-id'),
    } as ICategory) as ICategoryError;

    expect(CategoryCreated).toEqual(
      new CategoryError.InvalidCategoryInfoError('name'),
    );
  });

  it('should be able to test error invalid userId', () => {
    const CategoryCreated = Category.create({
      name: 'Test Name',
    } as ICategory) as ICategoryError;

    expect(CategoryCreated).toEqual(
      new CategoryError.InvalidCategoryInfoError('userId'),
    );
  });
});
