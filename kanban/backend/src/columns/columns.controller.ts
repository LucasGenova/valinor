import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CardsService } from '../cards/cards.service';

@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly columnsService: ColumnsService,
    private readonly cardsService: CardsService,
  ) {}

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Post()
  create(@Body() body: { boardId: string; name: string }) {
    return this.columnsService.create(body.boardId, body.name);
  }

  @Get(':columnId/cards')
  getCardsByColumn(@Param('columnId') columnId: string) {
    return this.cardsService.findByColumn(columnId);
  }

  @Delete()
  delete(@Body() body: { columnId: string }){
    this.columnsService.delete(body.columnId);
  }
}
