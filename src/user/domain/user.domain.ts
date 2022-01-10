import { Entity } from '../../shared/core/domain/entity';
import { IUser } from './interfaces/user.interface';
import { UniqueEntityID } from '../../shared/utils/unique-entity-id.utils';
import { Guard } from '../../shared/utils/guard.utils';
import { UserError, IUserError } from './user.domain.errors';

export type IUserProps = IUser;

export type UserType = IUserError | User;

export class User extends Entity<IUserProps> {
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
    return this.props.password;
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

    return new User(props, new UniqueEntityID(id));
  }
}
