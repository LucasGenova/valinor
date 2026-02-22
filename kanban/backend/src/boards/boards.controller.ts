import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ColumnsService } from '../columns/columns.service';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly columnsService: ColumnsService,
  ) { }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.boardsService.create(body.name);
  }

  @Get(':boardId/columns')
  getColumnsByBoard(@Param('boardId') boardId: string) {
    return this.columnsService.findByBoard(boardId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.boardsService.delete(id);
  }
}
