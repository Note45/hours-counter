import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserRepoErrors } from '../../infra/repository/user.repo.errors';
import { CreateNewUserUseCase } from './create-new-user.usecase';
import { UserRepoMongoose } from '../../infra/repository/implementation/user.repository.mongoose';
import { UserMapper } from '../../domain/mapper/user.mapper';
import { User } from '../../domain/user.domain';
import { UserService } from '../../services/user.service';
import { CreateNewUserError } from './create-new-user.errors';

jest.mock(
  '@modules/user/infra/repository/implementation/user.repository.mongoose',
);

describe('CreateNewUser Suit Test', () => {
  let userRepoMongoose: UserRepoMongoose;
  let createNewUserUseCase: CreateNewUserUseCase;
  const userMapper = new UserMapper();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CreateNewUserUseCase],
      providers: [
        UserService,
        UserMapper,
        { provide: 'UserRepoModel', useClass: UserRepoMongoose },
      ],
    }).compile();

    createNewUserUseCase =
      moduleRef.get<CreateNewUserUseCase>(CreateNewUserUseCase);

    userRepoMongoose = moduleRef.get<UserRepoMongoose>(
      getModelToken('UserRepo'),
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Test correct flux', () => {
    const userPersistenceMock = userMapper.toDomain({
      name: 'teste teste',
      email: 'teste@teste.com',
      password: 'dfadfasdfasdfasdfw35252342342342342',
      phone: '86984858328',
      id: '61fd5eac25cf45da70648303',
      _id: '61fd5eac25cf45da70648303',
    }) as User;

    beforeEach(() => {
      userRepoMongoose.createUser = jest
        .fn()
        .mockImplementationOnce(async () => userPersistenceMock);
      userRepoMongoose.getUserByEmail = jest
        .fn()
        .mockImplementationOnce(async () =>
          UserRepoErrors.UserGenericError.create('User not found!'),
        );
    });

    it('should be able to create a new user', async () => {
      const responseUseCase = await createNewUserUseCase.execute({
        name: userPersistenceMock.name,
        password: userPersistenceMock.password.toString(),
        email: userPersistenceMock.email,
        phone: userPersistenceMock.phone,
      });

      expect(responseUseCase).toEqual(userPersistenceMock);
    });
  });

  describe('Test error flux', () => {
    const userPersistenceMock = userMapper.toDomain({
      name: 'teste teste',
      email: 'teste@teste.com',
      password: 'dfadfasdfasdfasdfw35252342342342342',
      phone: '86984858328',
      id: '61fd5eac25cf45da70648303',
      _id: '61fd5eac25cf45da70648303',
    }) as User;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should be able to get error user already registered', async () => {
      userRepoMongoose.getUserByEmail = jest
        .fn()
        .mockImplementationOnce(async () => userPersistenceMock);

      const responseUseCase = await createNewUserUseCase.execute({
        name: userPersistenceMock.name,
        password: userPersistenceMock.password.toString(),
        email: userPersistenceMock.email,
        phone: userPersistenceMock.phone,
      });

      expect(responseUseCase).toEqual(
        CreateNewUserError.AlreadyRegisteredUser.create(),
      );
    });

    it('should be able to get error password invalid!', async () => {
      userRepoMongoose.getUserByEmail = jest
        .fn()
        .mockImplementationOnce(async () =>
          UserRepoErrors.UserGenericError.create('User not found!'),
        );

      const responseUseCase = await createNewUserUseCase.execute({
        name: userPersistenceMock.name,
        password: '111',
        email: userPersistenceMock.email,
        phone: userPersistenceMock.phone,
      });

      expect(responseUseCase).toEqual(
        new CreateNewUserError.InvalidParamError(
          'The password field has no minimum length!',
        ),
      );
    });

    it('should be able to get error can not save user on db!', async () => {
      userRepoMongoose.getUserByEmail = jest
        .fn()
        .mockImplementationOnce(async () =>
          UserRepoErrors.UserGenericError.create('User not found!'),
        );
      userRepoMongoose.createUser = jest
        .fn()
        .mockImplementationOnce(async () =>
          UserRepoErrors.UserGenericError.create(
            'Error when try save user on data base!',
          ),
        );

      const responseUseCase = await createNewUserUseCase.execute({
        name: userPersistenceMock.name,
        password: userPersistenceMock.password.toString(),
        email: userPersistenceMock.email,
        phone: userPersistenceMock.phone,
      });

      expect(responseUseCase).toEqual(
        new CreateNewUserError.OnDatabaseCreateNewUserError(
          'Error when try save user on data base!',
        ),
      );
    });
  });
});
