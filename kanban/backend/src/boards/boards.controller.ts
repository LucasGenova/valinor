import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.boardsService.create(body.name);
  }
}
