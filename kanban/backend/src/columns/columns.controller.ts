import { Body, Controller, Get, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Post()
  create(@Body() body: { board_id: string, name: string }) {
    return this.columnsService.create(body.board_id, body.name);
  }
}
