import { Injectable } from '@nestjs/common';
import { injectUserRepo } from 'src/modules/user/infra/repository/user.repo.decorator';
import { TokenJwtHelper } from '../../../../shared/utils/jwt-token.utils';
import { IUseCase } from '../../../../shared/utils/use-case';
import { User } from '../../domain/user.domain';
import { IUserError } from '../../domain/user.domain.errors';
import { IUserRepo } from '../../infra/repository/user.repo';
import { AuthDTO } from './auth.dto';
import { AuthErrors, IAuthErrors } from './auth.error';

type IResponse = IAuthErrors | string;

export type IAuthUseCase = IUseCase<AuthDTO, IResponse>;

@Injectable()
export class AuthUseCase implements IAuthUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(@injectUserRepo private repository: IUserRepo) {}

  async execute(dto: AuthDTO): Promise<IResponse> {
    const userOrError = await this.repository.getUserByEmail(dto.email);

    if ((userOrError as IUserError).message) {
      return AuthErrors.AuthCredentialsError.create();
    }

    const isPasswordCorrect = await (
      userOrError as User
    ).password.comparePassword(dto.password);

    if (!isPasswordCorrect) {
      return AuthErrors.AuthCredentialsError.create();
    }

    const token = TokenJwtHelper.generateToken(
      (userOrError as User).id.toString(),
    );

    return token;
  }
}
