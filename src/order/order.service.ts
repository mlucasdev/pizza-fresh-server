import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: userId,
        },
      },
      table: {
        connect: {
          number: dto.tableNumber,
        },
      },
      products: {
        createMany: {
          data: dto.products.map((element) => ({
            productId: element.productId,
            quantity: element.quantity,
            description: element.description,
          })),
        },
      },
    };

    return this.prisma.order
      .create({
        data,
        select: {
          id: true,
          table: {
            select: {
              number: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
          products: {
            select: {
              product: {
                select: {
                  name: true,
                },
              },
              quantity: true,
              description: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        table: {
          select: {
            number: true,
          },
        },
        products: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        table: {
          select: {
            number: true,
          },
        },
        products: {
          select: {
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
              },
            },
            quantity: true,
            description: true,
          },
        },
      },
    });
  }
}
