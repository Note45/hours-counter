import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserRepoErrors } from '../../infra/repository/user.repo.errors';
import { GetUserInfosUseCase } from './get-user-infos.usecase';
import { UserRepoMongoose } from '../../infra/repository/implementation/user.repository.mongoose';
import { UserMapper } from '../../domain/mapper/user.mapper';
import { User } from '../../domain/user.domain';
import { UserService } from '../../services/user.service';
import { GetUserInfoErrors } from './get-user-infos.errors';

jest.mock(
  '@modules/user/infra/repository/implementation/user.repository.mongoose',
);

describe('GetUserInfos Suit Test', () => {
  let userRepoMongoose: UserRepoMongoose;
  let getUserInfosUseCase: GetUserInfosUseCase;
  const userMapper = new UserMapper();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GetUserInfosUseCase],
      providers: [
        UserService,
        UserMapper,
        { provide: 'UserRepoModel', useClass: UserRepoMongoose },
      ],
    }).compile();

    getUserInfosUseCase =
      moduleRef.get<GetUserInfosUseCase>(GetUserInfosUseCase);

    userRepoMongoose = moduleRef.get<UserRepoMongoose>(
      getModelToken('UserRepo'),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Test correct flow', () => {
    const userPersistenceMock = userMapper.toDomain({
      name: 'teste teste',
      email: 'teste@teste.com',
      password: 'dfadfasdfasdfasdfw35252342342342342',
      phone: '86984858328',
      id: '61fd5eac25cf45da70648303',
      _id: '61fd5eac25cf45da70648303',
    }) as User;

    beforeEach(() => {
      userRepoMongoose.getUserById = jest
        .fn()
        .mockImplementationOnce(async () => userPersistenceMock);
    });

    it('should be able to get user infos', async () => {
      const responseUseCase = (await getUserInfosUseCase.execute({
        userId: userPersistenceMock.id.toString(),
      })) as User;

      expect(responseUseCase).toEqual(userPersistenceMock);
    });
  });

  describe('Test error flow', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should be able to get error user not found!', async () => {
      userRepoMongoose.getUserById = jest
        .fn()
        .mockImplementationOnce(async () =>
          UserRepoErrors.UserGenericError.create('User not found!'),
        );

      const responseUseCase = await getUserInfosUseCase.execute({
        userId: 'invalid-user-id',
      });

      expect(responseUseCase).toEqual(
        GetUserInfoErrors.GetUserInfosError.create('User not found!'),
      );
    });
  });
});
