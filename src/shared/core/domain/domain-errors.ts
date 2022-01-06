import { HttpStatus, Injectable } from '@nestjs/common';

interface IError {
  message: string;
  status?: HttpStatus;
}

@Injectable()
export abstract class DomainError implements IError {
  public readonly message: string;

  public status?: number = HttpStatus.BAD_REQUEST;

  constructor(message: string) {
    this.message = message;
  }
}
