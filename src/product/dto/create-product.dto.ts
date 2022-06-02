import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nome do produto. (Nome deve ser único)',
    example: 'Pizza de calabresa.',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 1000)
  @ApiProperty({
    description:
      'Descrição do produto. (Mínimo 10 carácteres e no máximo 1000)',
    example: 'Pizza de calabresa com cebola.',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Valor do Produto.',
    example: 59.95,
  })
  price: number;

  @IsNotEmpty()
  @IsUrl()
  @IsString()
  @ApiProperty({
    description: 'Url da imagem do produto.',
    example: 'https://imagepizzadecalabresa.com',
  })
  image: string;
}
