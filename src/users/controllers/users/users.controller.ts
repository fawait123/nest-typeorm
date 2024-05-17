import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { UsersDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Role.Admin, Role.User)
  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Roles(Role.Admin)
  @Post()
  @UsePipes(new ValidationPipe())
  storeUsers(@Body() userDto: UsersDto) {
    return this.userService.store(userDto);
  }
}
