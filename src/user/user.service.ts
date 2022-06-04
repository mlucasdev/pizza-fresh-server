import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto): Promise<User> {
    delete dto.confirmPassword;
    const data: User = { ...dto };
    return this.prisma.user.create({ data }).catch(handleError);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany();
    if (users.length == 0) {
      throw new NotFoundException('Nenhum usuário foi encontrado.');
    }
    return users;
  }

  findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    delete dto.confirmPassword;
    await this.findById(id);
    const data: Partial<User> = { ...dto };
    return this.prisma.user.update({ where: { id }, data }).catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com ID '${id}' não encontrado.`);
    }

    return record;
  }
}
