import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoInjectionJest } from '../../shared/utils/mongo-injection-jest.utils';
import { UserMapper } from '../domain/mapper/user.mapper';
import { User } from '../domain/user.domain';
import { UserEntity, UserSchema } from '../infra/entities/user.entity';

import { UserRepoMongoose } from '../infra/repository/implementation/user.repository.mongoose';
import { UserService } from './user.service';

const userMapper = new UserMapper();

const makeSutModule = async (mongoUri: string) => {
  const moduleRef = await Test.createTestingModule({
    controllers: [],
    providers: [
      UserRepoMongoose,
      UserMapper,
      UserService,
      { provide: 'UserRepoModel', useClass: UserRepoMongoose },
    ],
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
    userService: moduleRef.get<UserService>(UserService),
  };
};

const userBaseStub = userMapper.toDomain({
  email: 'teste@teste.com',
  name: 'User Test',
  password: 'pass-word-test',
  phone: '87996967865',
});

describe('UserService Suit Test', () => {
  beforeEach(async () => {
    await MongoInjectionJest.createServer();
  });

  afterEach(async () => {
    await MongoInjectionJest.disconnect();
  });

  it('should be able to create an user and checks if exists', async () => {
    const sut = await makeSutModule(MongoInjectionJest.serverUri);
    const user = userBaseStub as User;
    const result = await sut.userRepoMongoose.createUser(user);
    const userServiceResponse =
      await sut.userService.checkIfUserAlreadyExistsByEmail(user.email);

    expect(result).toBeInstanceOf(User);
    expect(userServiceResponse).toBeTruthy();
  });

  it('should be able to check the user not exists', async () => {
    const sut = await makeSutModule(MongoInjectionJest.serverUri);
    const userServiceResponse =
      await sut.userService.checkIfUserAlreadyExistsByEmail(
        'email-not-registered@test.com',
      );

    expect(userServiceResponse).toBeFalsy();
  });
});
