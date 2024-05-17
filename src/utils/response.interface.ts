import { HttpStatus } from '@nestjs/common';

export interface ResponseInterface<T> {
  message: string;
  statusCode: HttpStatus;
  data: T;
}
