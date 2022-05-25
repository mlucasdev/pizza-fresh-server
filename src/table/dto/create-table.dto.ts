import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateTableDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Número da mesa a ser criada.',
    example: 1,
  })
  number: number;
}
