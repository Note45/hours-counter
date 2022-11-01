import { Entity } from '../../../shared/core/domain/entity';
import { IUser } from './interfaces/user.interface';
import { UniqueEntityID } from '../../../shared/utils/unique-entity-id.utils';
import { Guard } from '../../../shared/utils/guard.utils';
import { UserError, IUserError } from './user.domain.errors';
import { Password } from './props/password';
import { DomainError } from '../../../shared/core/domain/domain-errors';

export type IUserProps = IUser;

export type UserType = IUserError | User;

export class User extends Entity<IUserProps> {
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get password() {
    return this.props.password as Password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: IUserProps, id?: UniqueEntityID): UserType {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.email, argumentName: 'email' },
      {
        argument: props.phone,
        argumentName: 'phone',
      },
      {
        argument: props.password,
        argumentName: 'password',
      },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return new UserError.InvalidUserInfoError(guardResult?.message || '');
    }

    if (!(props.password instanceof Password)) {
      const passwordOrError: DomainError | Password = Password.create({
        value: props.password,
      });

      if (passwordOrError instanceof DomainError) {
        return passwordOrError as unknown as IUserError;
      }

      // eslint-disable-next-line no-param-reassign
      props.password = passwordOrError;
    }

    return new User(props, new UniqueEntityID(id));
  }
}
