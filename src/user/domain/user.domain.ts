import { Entity } from '../../shared/core/domain/entity';
import { IUser } from './interfaces/user.interface';
import { UniqueEntityID } from '../../shared/utils/unique-entity-id.utils';

export type IUserProps = IUser;

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

  static create(props: IUserProps, id?: UniqueEntityID) {
    // Criar validações das propriedades obrigatorias.

    return new User(props, new UniqueEntityID(id));
  }
}
