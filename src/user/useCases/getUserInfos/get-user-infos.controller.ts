import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../../domain/user.domain';
import { IUserError } from '../../domain/user.domain.errors';
import { GetUserInfosUseCase } from './get-user-infos.usecase';
import { UserMapper } from '../../domain/mapper/user.mapper';
import { GetUserInfosDTO } from './get-user-infos.dto';

@Controller('/user')
export class GetUserInfosController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private getUserInfosUseCase: GetUserInfosUseCase,
    private mapper: UserMapper,
  ) {}

  @Get('/:userId')
  async Handle(@Param() dto: GetUserInfosDTO, @Res() response: Response) {
    try {
      const userOrError = await this.getUserInfosUseCase.execute(dto);

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
