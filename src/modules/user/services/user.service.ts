import { Injectable } from '@nestjs/common';
import { IUserRepo } from '../infra/repository/user.repo';
import { injectUserRepo } from '../infra/repository/user.repo.decorator';
import { IUserRepoErrors } from '../infra/repository/user.repo.errors';

@Injectable()
export class UserService {
  constructor(@injectUserRepo private userRepository: IUserRepo) {}

  async checkIfUserAlreadyExistsByEmail(email: string): Promise<boolean> {
    const userOrError = await this.userRepository.getUserByEmail(email);

    // if .message exist user is not already registered
    const userExistsOnDB = !(userOrError as IUserRepoErrors).message;

    return userExistsOnDB;
  }
}
