import { HttpModule, Module } from '@nestjs/common';
import { CategoryMapper } from './domain/mapper/category.mapper';
import {
  CategoryRepoModuleConfig,
  categoryRepoProviderName,
} from './infra/repository/category.repo.config';
import { CategoryRepoMongoose } from './infra/repository/implementation/category.repo.mongoose';
import { CategoryService } from './services/category.service';

@Module({
  imports: [CategoryRepoModuleConfig.toImport.Entity(), HttpModule],

  controllers: [],

  providers: [
    CategoryMapper,
    CategoryRepoMongoose,
    CategoryService,
    { provide: categoryRepoProviderName, useClass: CategoryRepoMongoose },
  ],

  exports: [
    { provide: categoryRepoProviderName, useClass: CategoryRepoMongoose },
  ],
})
export class CategoryModule {}
