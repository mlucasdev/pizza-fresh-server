import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo Pedido',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateOrderDto) {
    return this.orderService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os Pedidos',
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um Pedido pelo ID',
  })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
