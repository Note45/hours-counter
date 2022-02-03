import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IUserError } from '../../domain/user.domain.errors';
import { AuthDTO } from './auth.dto';
import { AuthUseCase } from './auth.usecase';

@Controller('/auth')
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private authUseCase: AuthUseCase) {}

  @Post()
  async Handle(@Body() auth: AuthDTO, @Res() response: Response) {
    try {
      const newUserTokenOrError = await this.authUseCase.execute(auth);

      if ((newUserTokenOrError as IUserError).message) {
        return response.status(400).json({
          message: [(newUserTokenOrError as IUserError).message],
          error: 'Bad Request',
        });
      }

      return response.status(200).json({ token: newUserTokenOrError });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error:${error} \n`);
      return response.status(500).json({ error });
    }
  }
}
