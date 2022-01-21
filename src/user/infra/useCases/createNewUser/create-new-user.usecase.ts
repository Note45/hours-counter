import { Injectable } from '@nestjs/common';
import { injectUserRepo } from 'src/user/infra/repository/user.repo.decorator';
import { UserMapper } from '../../../domain/mapper/user.mapper';
import { User } from '../../../domain/user.domain';
import { IUserError } from '../../../domain/user.domain.errors';
import { IUserRepo } from '../../repository/user.repo';
import { CreateNewUserDTO } from './create-new-user.dto';
import {
  CreateNewUserError,
  ICreateNewUserError,
} from './create-new-user.errors';

type IResponse = ICreateNewUserError | User;

@Injectable()
export class CreateNewUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @injectUserRepo private repository: IUserRepo,
    private mapper: UserMapper,
  ) {}

  async execute(dto: CreateNewUserDTO): Promise<IResponse> {
    const userDomain = this.mapper.toDomain({
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      password: dto.password,
    });

    if ((userDomain as IUserError).message) {
      return CreateNewUserError.InvalidParamError.create(
        (userDomain as IUserError).message,
      );
    }

    const newUserOrErrorCreated = await this.repository.createUser(
      userDomain as User,
    );

    if ((newUserOrErrorCreated as IUserError).message) {
      CreateNewUserError.OnDatabaseCreateNewUserError.create(
        (newUserOrErrorCreated as IUserError).message,
      );
    }

    return newUserOrErrorCreated;
  }
}
