import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KanbanService } from './kanban.service';

@Controller('kanban')
export class KanbanController {
  constructor(private kanbanService: KanbanService) {}

  @Post('columns')
  createColumn(@Body() body: { title: string }) {
    return this.kanbanService.createColumn(body.title);
  }

  @Get('columns')
  getColumns() {
    return this.kanbanService.getAllColumns();
  }

  @Get('columns/:columnId')
  getColumn(@Param('columnId') columnId: string) {
    return this.kanbanService.getColumn(columnId);
  }

  @Post('columns/:columnId/cards')
  createCard(
    @Param('columnId') columnId: string,
    @Body() body: { title: string; description?: string },
  ) {
    return this.kanbanService.createCard(
      columnId,
      body.title,
      body.description,
    );
  }

  @Get('columns/:columnId/:cardId')
  getCard(
    @Param('columnId') columnId: string,
    @Param('cardId') cardId: string,
  ) {
    return this.kanbanService.getCard(columnId, cardId);
  }
}
