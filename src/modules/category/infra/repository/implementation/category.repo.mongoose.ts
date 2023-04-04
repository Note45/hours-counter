import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryRepoErrors } from '../category.repo.errors';
import { Category } from '../../../domain/category.domain';
import { CategoryEntity } from '../../entities/category.entity';
import { CategoryResponse, ICategoryRepo } from '../category.repo';
import { ICategory } from '../../../domain/interfaces/category.interface';
import { CategoryMapper } from '../../../domain/mapper/category.mapper';

@Injectable()
export class CategoryRepoMongoose implements ICategoryRepo {
  constructor(
    @InjectModel(CategoryEntity.name)
    private CategoryModel: Model<CategoryEntity>,
    private categoryMapper: CategoryMapper,
  ) {}

  async createCategory(
    category: Category,
  ): Promise<CategoryResponse<Category>> {
    const newCategory = await new this.CategoryModel(
      this.categoryMapper.toPersistence(category),
    ).save();

    if (newCategory) {
      const result = this.categoryMapper.toDomain({
        ...newCategory.toJSON(),
        id: newCategory.toJSON()._id.toString(),
      } as unknown as ICategory);

      if (result) {
        return result;
      }
    }

    return CategoryRepoErrors.CategoryGenericError.create(
      'Error when try save the new category on data base!',
    );
  }
}
