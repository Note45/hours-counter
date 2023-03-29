import { UniqueEntityID } from '../../../../shared/utils/unique-entity-id.utils';
import { Category, CategoryType } from '../category.domain';
import { ICategory } from '../interfaces/category.interface';

export type ICategoryPesistence = Omit<ICategory, 'id'>;

export class CategoryMapper {
  public toPersistence(category: Category): ICategoryPesistence {
    const payload: ICategoryPesistence = {
      _id: category.id,
      userId: category.userId,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };

    return payload;
  }

  public toDomain(raw: ICategory): CategoryType {
    if (typeof raw.id === 'string' || typeof raw._id === 'string') {
      // eslint-disable-next-line no-param-reassign
      raw.id = new UniqueEntityID(raw.id || raw._id);
      // eslint-disable-next-line no-param-reassign
      raw._id = new UniqueEntityID(raw.id || raw._id);
    }

    return Category.create(raw, raw.id || raw._id);
  }
}
