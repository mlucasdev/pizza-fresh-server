import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProductDto): Promise<Product> {
    const data: Product = { ...dto };
    return this.prisma.product.create({ data });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateProductDto): Promise<Product> {
    const data: Partial<Product> = { ...dto };
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.prisma.product.delete({ where: { id } });
    throw new HttpException('', 204);
  }
}
