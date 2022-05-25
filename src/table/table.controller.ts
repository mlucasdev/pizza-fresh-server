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
  create(@Body() dto: CreateTableDto) {
    return this.tableService.create(dto);
  }

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tableService.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() updateTableDto: UpdateTableDto) {
  //   return this.tableService.update(id, updateTableDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.tableService.remove(id);
  // }
}
