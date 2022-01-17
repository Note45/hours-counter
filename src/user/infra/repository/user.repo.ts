import { User } from '../../domain/user.domain';
import { IUserRepoErrors } from './user.repo.errors';

export type UserResponse<T> = IUserRepoErrors | T;

export interface IUserRepo {
  getUserById(id: string): Promise<UserResponse<User>>;
  createUser(user: User): Promise<UserResponse<User>>;
}
