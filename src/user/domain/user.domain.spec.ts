import { IUser } from './interfaces/user.interface';
import { User } from './user.domain';
import { IUserError, UserError } from './user.domain.errors';

const describeBaseTest = 'test domain user';
const describeFailedTest = 'test domain erros user';

describe(describeBaseTest, () => {
  it('should be able to create a user', () => {
    const userProps = {
      name: 'Test Name',
      email: 'teste@test.com',
      password: 'hash-pass',
      phone: '5586998345689',
    };

    const userCreated = User.create(userProps) as User;

    expect(userCreated).toBeDefined();
    expect(userCreated.name).toEqual(userProps.name);
    expect(userCreated.email).toEqual(userProps.email);
    expect(userCreated.password).toEqual(userProps.password);
    expect(userCreated.phone).toEqual(userProps.phone);
  });
});

describe(describeFailedTest, () => {
  it('should be able to test error invalid email', () => {
    const userCreated = User.create({
      name: 'Test Name',
      password: 'hash-pass',
      phone: '5586998345689',
    } as IUser) as IUserError;

    expect(userCreated).toEqual(new UserError.InvalidUserInfoError('email'));
  });
});
