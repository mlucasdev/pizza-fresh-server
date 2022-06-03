import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto): Promise<User> {
    delete dto.confirmPassword;
    const data: User = { ...dto };
    return this.prisma.user.create({ data });
  }
}
