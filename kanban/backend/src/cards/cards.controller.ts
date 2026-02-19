import { Body, Controller, Get, Post } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Post()
  create(@Body() body: { columnId: string, title: string, body?: string }) {
    return this.cardsService.create(body.columnId, body.title, body.body);
  }
}
