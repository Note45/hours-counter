import { MongooseModule } from '@nestjs/mongoose';
import { CategoryEntity, CategorySchema } from '../entities/category.entity';
import { CategoryRepoMongoose } from './implementation/category.repo.mongoose';

export const categoryRepoProviderName = 'CategoryRepoModel';

export const CategoryRepoModuleConfig = {
  toProvider: () => ({
    provide: categoryRepoProviderName,
    useClass: CategoryRepoMongoose,
  }),
  toImport: {
    Entity: () =>
      MongooseModule.forFeature([
        { name: CategoryEntity.name, schema: CategorySchema },
      ]),
  },
};
