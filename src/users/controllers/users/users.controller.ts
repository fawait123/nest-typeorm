import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  storeUsers(@Body() userDto: UsersDto) {
    return this.userService.store(userDto);
  }
}
