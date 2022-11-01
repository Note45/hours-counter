import { DomainError } from '../../../../shared/core/domain/domain-errors';
import { IPassword } from '../interfaces/password.interface';
import { Password } from './password';

const describeBaseTest = 'test password domain field';
const describeFailedTest = 'test domain errors password field';

describe(describeBaseTest, () => {
  const passwordNotHashed: IPassword = {
    value: '$2a$10$YzYPT6tbma80.hCx5yJb6u2YaygoZ65fQVuVIySqC3KtyFXBCHZQu',
    hashed: false,
  };

  it('should be able to create a hashed password', () => {
    const PasswordHashed = Password.create(passwordNotHashed) as Password;

    const PasswordIsHashed = PasswordHashed.isAlreadyHashed();

    expect(PasswordIsHashed).toEqual(true);
    expect(PasswordHashed.value).toEqual(passwordNotHashed.value);
  });

  it('should creat hashed password with same hashed passed', () => {
    const PasswordHashedProps = { ...passwordNotHashed, hashed: true };

    const PasswordHashed = Password.create(PasswordHashedProps) as Password;

    expect(PasswordHashed.props.value).toEqual(PasswordHashedProps.value);
  });

  it('should create a password hashed equal to user password', async () => {
    const PasswordPlainText = 'nova-Password-plain-text';
    const PasswordHashed = Password.create({
      value: PasswordPlainText,
    }) as Password;

    const PasswordIsEqualHashed = await PasswordHashed.comparePassword(
      PasswordPlainText,
    );

    expect(PasswordIsEqualHashed).toEqual(true);
  });
});

describe(describeFailedTest, () => {
  it('should test error return password field has no minimum length!', () => {
    const PasswordHashed = Password.create({
      value: '1234',
    });

    expect(PasswordHashed as DomainError).toMatchObject({
      message: 'The password field has no minimum length!',
    });
  });
});
