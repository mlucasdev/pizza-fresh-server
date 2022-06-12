import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dtp';

@Injectable()
export class AuthSercive {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { nickname, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { nickname } });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Usuário eee/ou senha inválidos');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ nickname }),
      user,
    };
  }
}
