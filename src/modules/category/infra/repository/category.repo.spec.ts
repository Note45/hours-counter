import { Test } from '@nestjs/testing';
import { CategoryMapper } from '../../domain/mapper/category.mapper';
import { CategoryRepoMongoose } from './implementation/category.repo.mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryEntity, CategorySchema } from '../entities/category.entity';
import { MongoInjectionJest } from '../../../../shared/utils/mongo-injection-jest.utils';
import { Category } from '../../domain/category.domain';

const categoryMapper = new CategoryMapper();

const makeSutModule = async (mongoUri: string) => {
  const moduleRef = await Test.createTestingModule({
    controllers: [],
    providers: [CategoryRepoMongoose, CategoryMapper],
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
  };
};

const categoryBaseStub = categoryMapper.toDomain({
  name: 'User Test',
  userId: 'pass-word-test',
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe('UserRepoMongoose Suit Test', () => {
  beforeEach(async () => {
    await MongoInjectionJest.createServer();
  });

  afterEach(async () => {
    await MongoInjectionJest.disconnect();
  });

  it('should be able to create an category on data base with userBaseStub infos', async () => {
    const sut = await makeSutModule(MongoInjectionJest.serverUri);
    const category = categoryBaseStub as Category;
    const result = await sut.categoryRepoMongoose.createCategory(category);

    expect(result).toBeInstanceOf(Category);
  });
});
