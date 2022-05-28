import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  private readonly tables: Table[] = [];

  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };

    return this.prisma.table.create({ data });
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  findOne(id: string): Promise<Table> {
    return this.prisma.table.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateTableDto): Promise<Table> {
    const data: Partial<Table> = { ...dto };
    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.table.delete({ where: { id } });
  }
}
