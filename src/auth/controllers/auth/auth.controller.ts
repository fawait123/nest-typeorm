import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from 'src/auth/dtos/auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @UsePipes(new ValidationPipe())
  login(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto.username, authDto.password);
  }
}
