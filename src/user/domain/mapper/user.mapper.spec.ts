import { User } from '../user.domain';
import { UserMapper } from './user.mapper';

const userMapper = new UserMapper();

const makeSutToDomain = (props: any) => {
  const user = userMapper.toDomain(props);

  return user as User;
};

const makeSutToPersistence = (props: any) => userMapper.toPersistence(props);

const makeSutToDTO = (props: any) => userMapper.toDTO(props);

describe('UserMapper suit tests', () => {
  it('should be able to create domain user', () => {
    const payloadUserDomain = {
      name: 'User Test Name',
      email: 'test@teste.com',
      phone: '89981842344',
      password: 'test-password',
    };

    const userDomainResult = makeSutToDomain(payloadUserDomain);

    expect(userDomainResult.id).toBeUndefined();
    expect(userDomainResult.name).toBe(payloadUserDomain.name);
    expect(userDomainResult.email).toBe(payloadUserDomain.email);
    expect(userDomainResult.phone).toBe(payloadUserDomain.phone);
    expect(userDomainResult.password).toBe(payloadUserDomain.password);
    expect(userDomainResult.createdAt).toBeUndefined();
    expect(userDomainResult.updatedAt).toBeUndefined();
  });

  it('should be able to create persistence user', () => {
    const userDomainResult = makeSutToDomain({
      name: 'User Test Name',
      email: 'test@teste.com',
      phone: '89981842344',
      password: 'test-password',
    });

    const userPersistenceResult = makeSutToPersistence(userDomainResult);

    expect(userPersistenceResult._id).toBeUndefined();
    expect(userPersistenceResult.name).toBe(userDomainResult.name);
    expect(userPersistenceResult.email).toBe(userDomainResult.email);
    expect(userPersistenceResult.phone).toBe(userDomainResult.phone);
    expect(userPersistenceResult.password).toBe(
      userDomainResult.password.value,
    );
    expect(userDomainResult.createdAt).toBeUndefined();
    expect(userDomainResult.updatedAt).toBeUndefined();
  });

  it('should be able to create dto user', () => {
    const userDomainResult = makeSutToDomain({
      name: 'User Test Name',
      email: 'test@teste.com',
      phone: '89981842344',
      password: 'test-password',
    });

    const userDtoResult = makeSutToDTO(userDomainResult);

    expect(userDtoResult.id).toBeUndefined();
    expect(userDtoResult.name).toBe(userDomainResult.name);
    expect(userDtoResult.email).toBe(userDomainResult.email);
    expect(userDtoResult.phone).toBe(userDomainResult.phone);
    expect(userDtoResult['password']).toBeUndefined();
    expect(userDomainResult.createdAt).toBeUndefined();
    expect(userDomainResult.updatedAt).toBeUndefined();
  });
});
