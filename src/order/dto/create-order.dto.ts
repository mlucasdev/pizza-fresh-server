import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário que está criando o pedido',
    example: '095f93b4-ef83-41ed-9565-7392a4b2b8b6',
  })
  userId: string;

  @IsInt()
  @ApiProperty({
    description: 'Número da mesa que está realizando o pedido',
    example: '1',
  })
  tableNumber: number;

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Lista com os IDs dos produtos que estão no pedido',
    example:
      '["1c83237a-9120-47a4-b88d-9f6ed1f9e737","6bbf8231-4c75-4db5-a736-7d7867fa7706"]',
  })
  products: string[];
}
