import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    const randomId = Math.floor(Math.random() * (999999 - 1)) + 1;
    return this.tableService.create(randomId, createTableDto);
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Get(':id')
  findOne(@Param() params) {
    return this.tableService.findOne(params.id);
  }

  @Put(':id')
  update(@Param('id') id: Number, @Body() updateTableDto: CreateTableDto) {
    return this.tableService.update(id, updateTableDto);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.tableService.remove(params.id);
  }
}
