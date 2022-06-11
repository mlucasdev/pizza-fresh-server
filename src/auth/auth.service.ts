import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dtp';

@Injectable()
export class AuthSercive {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    return {
      token: 'Teste',
      user: undefined,
    };
  }
}
