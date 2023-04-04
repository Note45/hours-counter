import { Category } from '../../domain/category.domain';
import { ICategoryRepoErrors } from './category.repo.errors';

export type CategoryResponse<T> = ICategoryRepoErrors | T;

export interface ICategoryRepo {
  createCategory(Category: Category): Promise<CategoryResponse<Category>>;
}
