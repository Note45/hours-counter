/* eslint-disable no-use-before-define */
import * as bcrypt from 'bcryptjs';
import { ValueObject } from '../../../../shared/core/domain/value-object';
import { Guard } from '../../../../shared/utils/guard.utils';
import { IUserError, UserError } from '../user.domain.errors';
import { IPassword } from '../interfaces/password.interface';

export type PasswordType = IUserError | Password;

export type PasswordProps = Omit<IPassword, 'value'> & {
  value: string | IPassword;
};

const BcryptRegex = /^\$2[aby]?\$\d{1,2}\$[./A-Za-z0-9]{53}$/;

export class Password extends ValueObject<IPassword> {
  get value() {
    return this.props.value;
  }

  get hashed() {
    return this.isAlreadyHashed();
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor(props: IPassword) {
    super(props);
  }

  private static hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    const hashed = this.props.value;
    return bcrypt.compareSync(plainTextPassword, hashed);
  }

  public isAlreadyHashed(): boolean {
    return BcryptRegex.test(this.value);
  }

  public static isBcryptHash(value: string): boolean {
    return BcryptRegex.test(value);
  }

  public static isMinimumLength(value: string) {
    return value.length > 5;
  }

  public static create(props: PasswordProps): PasswordType {
    const valueString =
      typeof props.value === 'string' ? props.value : props.value.value;

    const propsResult = Guard.againstNullOrUndefined(valueString, 'password');
    if (!propsResult.succeeded) {
      UserError.GenericMessageError.create('The password field is required!');
    }

    if (!this.isBcryptHash(valueString)) {
      const isMinimumLength = this.isMinimumLength(valueString);
      if (!isMinimumLength) {
        return UserError.GenericMessageError.create(
          'The password field has no minimum length!',
        );
      }

      const hashedPass = this.hashPassword(valueString);
      return new Password({
        value: hashedPass,
        hashed: true,
      });
    }

    return new Password({ value: valueString, hashed: true });
  }
}
