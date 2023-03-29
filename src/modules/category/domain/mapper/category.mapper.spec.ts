import { Category } from '../category.domain';
import { CategoryMapper } from './category.mapper';

const categoryMapper = new CategoryMapper();

const makeSutToDomain = (props: any) => {
  const user = categoryMapper.toDomain(props);

  return user as Category;
};

const makeSutToPersistence = (props: any) =>
  categoryMapper.toPersistence(props);

describe('CategoryMapper suit tests', () => {
  it('should be able to create a domain category', () => {
    const payloadCategory = {
      name: 'Category Test Name',
      userId: 'Category Test UserId',
    };

    const categoryDomainResult = makeSutToDomain(payloadCategory);

    expect(categoryDomainResult.id).toBeUndefined();
    expect(categoryDomainResult.name).toBe(categoryDomainResult.name);
    expect(categoryDomainResult.userId).toBe(categoryDomainResult.userId);
    expect(categoryDomainResult.createdAt).toBeUndefined();
    expect(categoryDomainResult.updatedAt).toBeUndefined();
  });
  it('it should be able to create a persistence category', () => {
    const categoryDomainResult = makeSutToDomain({
      name: 'Category Test Name 2 ',
      userId: 'Category Test UserId 2',
    });

    const categoryPersistenceResult =
      makeSutToPersistence(categoryDomainResult);

    expect(categoryPersistenceResult._id).toBeUndefined();
    expect(categoryPersistenceResult.name).toBe(categoryDomainResult.name);
    expect(categoryPersistenceResult.userId).toBe(categoryDomainResult.userId);
    expect(categoryPersistenceResult.createdAt).toBeUndefined();
    expect(categoryPersistenceResult.updatedAt).toBeUndefined();
  });
});
