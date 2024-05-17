import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });

      if (!user)
        throw new HttpException(
          'These credentials doesnt match to our record',
          HttpStatus.BAD_REQUEST,
        );

      if (!bcrypt.compareSync(password, user.password))
        throw new HttpException(
          'These credentials doesnt match to our record',
          HttpStatus.BAD_REQUEST,
        );

      const payload = {
        email: user.email,
      };

      const token = this.jwtService.sign(payload);
      return {
        ...user,
        token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
