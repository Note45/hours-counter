import { Injectable } from '@nestjs/common';
import {
  CategoryResponse,
  ICategoryRepo,
} from '../infra/repository/category.repo';
import { injectCategoryRepo } from '../infra/repository/category.repo.decorator';
import { Category } from '../domain/category.domain';

@Injectable()
export class CategoryService {
  constructor(@injectCategoryRepo private categoryRepository: ICategoryRepo) {}

  createCategory(category: Category): Promise<CategoryResponse<Category>> {
    return this.categoryRepository.createCategory(category);
  }
}
