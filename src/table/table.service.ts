import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TableService {
  private readonly tables: Table[] = [];

  create(id: Number, createTableDto: CreateTableDto) {
    const table: Table = { id: id, ...createTableDto };
    this.tables.push(table);
    return table;
  }

  findAll(): Table[] {
    return this.tables;
  }

  findOne(id: Number) {
    for (let i of this.tables) {
      if (id === i.id) {
        return i;
      }
    }
  }

  update(id: Number, updateTableDto: UpdateTableDto) {
    for (let i = 0; i < this.tables.length; i++) {
      if (id == this.tables[i].id) {
        this.tables[i].number = updateTableDto.number;
        return this.tables[i];
      }
    }
  }

  remove(id: Number) {
    for (let i = 0; i < this.tables.length; i++) {
      if (id == this.tables[i].id) {
        const table = this.tables[i];
        this.tables.splice(1, i);
        return { message: `Mesa ${table.number} deletada com sucesso.` };
      }
    }
  }
}
