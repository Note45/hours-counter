import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { injectUserRepo } from '../../infra/repository/user.repo.decorator';
import { IUseCase } from '../../../shared/utils/use-case';
import { User } from '../../domain/user.domain';
import { IUserError } from '../../domain/user.domain.errors';
import { IUserRepo } from '../../infra/repository/user.repo';
import {
  IGetUserInfosErrorError,
  GetUserInfoErrors,
} from './get-user-infos.errors';
import { GetUserInfosDTO } from './get-user-infos.dto';

type IResponse = IGetUserInfosErrorError | User;

export type IGetUserInfosUseCase = IUseCase<GetUserInfosDTO, IResponse>;

@Injectable()
export class GetUserInfosUseCase implements IGetUserInfosUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(@injectUserRepo private userRepo: IUserRepo) {}

  async execute(dto: GetUserInfosDTO): Promise<IResponse> {
    const isUserIdAValidId = Types.ObjectId.isValid(dto.userId);

    if (!isUserIdAValidId) {
      return GetUserInfoErrors.GetUserInfosError.create('User not found!');
    }

    const userOrError = await this.userRepo.getUserById(dto.userId);

    if ((userOrError as IUserError).message) {
      return GetUserInfoErrors.GetUserInfosError.create(
        (userOrError as IUserError).message,
      );
    }

    return userOrError;
  }
}
