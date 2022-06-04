import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    nickname: true,
    name: true,
    password: false,
    image: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }
    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleError);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany({
      select: this.userSelect,
    });
    if (users.length == 0) {
      throw new NotFoundException('Nenhum usuário foi encontrado.');
    }
    return users;
  }

  findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }
    delete dto.confirmPassword;

    await this.findById(id);
    const data: Partial<User> = { ...dto };
    if (data.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user
      .update({ where: { id }, data, select: this.userSelect })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com ID '${id}' não encontrado.`);
    }

    return record;
  }
}
