import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateTableDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Novo número da mesa.',
    example: 7,
  })
  number: Number;
}
