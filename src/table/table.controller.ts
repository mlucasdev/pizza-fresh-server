import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { TableService } from './table.service';

@ApiTags('table')
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
  update(@Param('id') id: Number, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(id, updateTableDto);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.tableService.remove(params.id);
  }
}
