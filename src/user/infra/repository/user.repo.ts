import { User } from '../../domain/user.domain';
import { IUserRepoErrors } from './user.repo.errors';

export type UserResponse<T> = IUserRepoErrors | T;

export interface IUserRepo {
  getClienteById(id: string): Promise<UserResponse<User>>;
  createCliente(user: User): Promise<UserResponse<User>>;
}
