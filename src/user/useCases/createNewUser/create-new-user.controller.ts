import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../../domain/user.domain';
import { IUserError } from '../../domain/user.domain.errors';
import { CreateNewUserDTO } from './create-new-user.dto';
import { CreateNewUserUseCase } from './create-new-user.usecase';
import { UserMapper } from '../../domain/mapper/user.mapper';

@Controller('/user')
export class CreateNewUserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private createNewUserUseCase: CreateNewUserUseCase,
    private mapper: UserMapper,
  ) {}

  @Post()
  async Handle(
    @Body() createNewUser: CreateNewUserDTO,
    @Res() response: Response,
  ) {
    try {
      const newUserOrError = await this.createNewUserUseCase.execute(
        createNewUser,
      );

      if ((newUserOrError as IUserError).message) {
        return response.status(400).json({
          message: [(newUserOrError as IUserError).message],
          error: 'Bad Request',
        });
      }
      return response
        .status(201)
        .json(this.mapper.toDTO(newUserOrError as User));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error:${error} \n`);
      return response.status(500).json({ error });
    }
  }
}
