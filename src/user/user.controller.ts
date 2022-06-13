import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Usuário.',
  })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os Usuários.',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um Usuário pelo ID.',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um Usuário pelo ID.',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um Usuário pelo Id',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
