import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';

export class CreateOrderDto {
  @IsInt()
  @ApiProperty({
    description: 'Número da mesa que está realizando o pedido',
    example: '1',
  })
  tableNumber: number;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'Lista com os IDs dos produtos que estão no pedido',
    type: [CreateOrderProductDto],
  })
  products: CreateOrderProductDto[];
}
