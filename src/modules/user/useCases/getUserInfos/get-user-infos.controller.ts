import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { User } from '../../domain/user.domain';
import { IUserError } from '../../domain/user.domain.errors';
import { GetUserInfosUseCase } from './get-user-infos.usecase';
import { UserMapper } from '../../domain/mapper/user.mapper';
import { JwtAuthGuard } from '../../../../shared/core/infra/guards/jwt-auth.guard';

@Controller('/user')
export class GetUserInfosController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private getUserInfosUseCase: GetUserInfosUseCase,
    private mapper: UserMapper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async Handle(@Req() request: Request, @Res() response: Response) {
    try {
      const userOrError = await this.getUserInfosUseCase.execute({
        userId: request.user.userId,
      });

      if ((userOrError as IUserError).message) {
        return response.status(400).json({
          message: [(userOrError as IUserError).message],
          error: 'Bad Request',
        });
      }
      return response.status(200).json(this.mapper.toDTO(userOrError as User));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error:${error} \n`);
      return response.status(500).json({ error });
    }
  }
}
