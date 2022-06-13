import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
