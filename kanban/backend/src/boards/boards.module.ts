import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { ColumnsController } from 'src/columns/columns.controller';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [CardsModule], 
  controllers: [BoardsController, ColumnsController],
  providers: [BoardsService, ColumnsService],
})
export class BoardsModule {}
