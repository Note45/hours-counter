import { Injectable } from '@nestjs/common';
import { injectUserRepo } from '../../infra/repository/user.repo.decorator';
import { IUseCase } from '../../../shared/utils/use-case';
import { UserMapper } from '../../domain/mapper/user.mapper';
import { User } from '../../domain/user.domain';
import { IUserError } from '../../domain/user.domain.errors';
import { IUserRepo } from '../../infra/repository/user.repo';
import { UserService } from '../../services/user.service';
import { CreateNewUserDTO } from './create-new-user.dto';
import {
  CreateNewUserError,
  ICreateNewUserError,
} from './create-new-user.errors';

type IResponse = ICreateNewUserError | User;

export type ICreateNewUserUseCase = IUseCase<CreateNewUserDTO, IResponse>;

@Injectable()
export class CreateNewUserUseCase implements ICreateNewUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @injectUserRepo private repository: IUserRepo,
    private mapper: UserMapper,
    private userService: UserService,
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

    const userAlreadyExists =
      await this.userService.checkIfUserAlreadyExistsByEmail(dto.email);

    if (userAlreadyExists) {
      return CreateNewUserError.AlreadyRegisteredUser.create();
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
