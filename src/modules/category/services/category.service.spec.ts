import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { CategoryMapper } from '../domain/mapper/category.mapper';
import {
  CategoryEntity,
  CategorySchema,
} from '../infra/entities/category.entity';
import { CategoryRepoMongoose } from '../infra/repository/implementation/category.repo.mongoose';
import { CategoryService } from './category.service';
import { MongoInjectionJest } from '../../../shared/utils/mongo-injection-jest.utils';
import { Category } from '../domain/category.domain';

const categoryMapper = new CategoryMapper();

const makeSutModule = async (mongoUri: string) => {
  const moduleRef = await Test.createTestingModule({
    controllers: [],
    providers: [
      CategoryRepoMongoose,
      CategoryMapper,
      CategoryService,
      { provide: 'CategoryRepoModel', useClass: CategoryRepoMongoose },
    ],
    imports: [
      MongooseModule.forFeature([
        { name: CategoryEntity.name, schema: CategorySchema },
      ]),
      MongooseModule.forRoot(mongoUri),
    ],
    exports: [CategoryRepoMongoose],
  }).compile();
  return {
    categoryRepoMongoose:
      moduleRef.get<CategoryRepoMongoose>(CategoryRepoMongoose),
    categoryService: moduleRef.get<CategoryService>(CategoryService),
  };
};

const categoryBaseStub = categoryMapper.toDomain({
  name: 'User Test',
  userId: 'pass-word-test',
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe('CategoryService Suit Test', () => {
  beforeEach(async () => {
    await MongoInjectionJest.createServer();
  });

  afterEach(async () => {
    await MongoInjectionJest.disconnect();
  });

  it('should be able to create an category', async () => {
    const sut = await makeSutModule(MongoInjectionJest.serverUri);
    const createCategorySpy = jest.spyOn(
      sut.categoryRepoMongoose,
      'createCategory',
    );
    const category = categoryBaseStub as Category;
    const result = await sut.categoryRepoMongoose.createCategory(category);

    expect(result).toBeInstanceOf(Category);
    expect(createCategorySpy).toBeCalledTimes(1);
  });
});
