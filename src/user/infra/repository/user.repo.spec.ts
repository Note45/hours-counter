import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoInjectionJest } from '../../../shared/utils/mongo-injection-jest.utils';
import { UserMapper } from '../../domain/mapper/user.mapper';
import { User } from '../../domain/user.domain';
import { UserEntity, UserSchema } from '../entities/user.entity';
import { UserRepoMongoose } from './implementation/user.repository.mongoose';

const userMapper = new UserMapper();

const makeSutModule = async (mongoUri: string) => {
  const moduleRef = await Test.createTestingModule({
    controllers: [],
    providers: [UserRepoMongoose, UserMapper],
    imports: [
      MongooseModule.forFeature([
        { name: UserEntity.name, schema: UserSchema },
      ]),
      MongooseModule.forRoot(mongoUri),
    ],
    exports: [UserRepoMongoose],
  }).compile();
  return {
    userRepoMongoose: moduleRef.get<UserRepoMongoose>(UserRepoMongoose),
  };
};

const userBaseStub = userMapper.toDomain({
  email: 'teste@teste.com',
  name: 'User Test',
  password: 'pass-word-test',
  phone: '87996967865',
});

describe('UserRepoMongoose Suit Test', () => {
  beforeEach(async () => {
    await MongoInjectionJest.createServer();
  });

  afterEach(async () => {
    await MongoInjectionJest.disconnect();
  });

  it('should be able to create an user on data base with userBaseStub infos', async () => {
    const sut = await makeSutModule(MongoInjectionJest.serverUri);
    const user = userBaseStub as User;
    const result = await sut.userRepoMongoose.createUser(user);

    expect(result).toBeInstanceOf(User);
  });

  it('should be able to get created user by id', async () => {
    const sut = await makeSutModule(MongoInjectionJest.serverUri);
    const user = userBaseStub as User;
    const createdUserResult = (await sut.userRepoMongoose.createUser(
      user,
    )) as User;

    const getUserByIdResult = (await sut.userRepoMongoose.getUserById(
      createdUserResult.id.toString(),
    )) as User;

    expect(createdUserResult).toBeInstanceOf(User);
    expect(getUserByIdResult.id).toEqual(createdUserResult.id);
    expect(getUserByIdResult.name).toEqual(createdUserResult.name);
    expect(getUserByIdResult.phone).toEqual(createdUserResult.phone);
    expect(getUserByIdResult.email).toEqual(createdUserResult.email);
    expect(getUserByIdResult.password).toEqual(createdUserResult.password);
  });

  it('should be able to get created user by email', async () => {
    const sut = await makeSutModule(MongoInjectionJest.serverUri);
    const user = userBaseStub as User;
    const createdUserResult = (await sut.userRepoMongoose.createUser(
      user,
    )) as User;

    const getUserByIdResult = (await sut.userRepoMongoose.getUserByEmail(
      createdUserResult.email,
    )) as User;

    expect(createdUserResult).toBeInstanceOf(User);
    expect(getUserByIdResult.id.toString()).toEqual(
      createdUserResult.id.toString(),
    );
    expect(getUserByIdResult.name).toEqual(createdUserResult.name);
    expect(getUserByIdResult.phone).toEqual(createdUserResult.phone);
    expect(getUserByIdResult.email).toEqual(createdUserResult.email);
    expect(getUserByIdResult.password).toEqual(createdUserResult.password);
  });
});
