import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService?: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const bearer = this.getBearerTokenFromHeaders(request);

      const payload = await this.jwtService.verifyAsync(bearer);
      request.user = payload;
      return true;
    } catch (error) {
      throw new HttpException('Anuthorized', HttpStatus.BAD_REQUEST);
    }
  }

  getBearerTokenFromHeaders(request: Request) {
    const authorization = request.headers.authorization;
    const [type, bearer] = authorization.split(' ');
    if (!type)
      throw new HttpException(
        'Authorization type is invalid',
        HttpStatus.BAD_REQUEST,
      );

    if (!bearer)
      throw new HttpException(
        'Authorization type is invalid',
        HttpStatus.BAD_REQUEST,
      );
    return bearer;
  }
}
