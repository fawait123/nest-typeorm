import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseInterface } from 'src/utils/response.interface';

@Injectable()
export class HttpSuccessInterceptor<T>
  implements NestInterceptor<T, ResponseInterface<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterface<T>> {
    return next.handle().pipe(
      map((data) => ({
        message: 'success',
        statusCode: HttpStatus.OK,
        data,
      })),
    );
  }
}
