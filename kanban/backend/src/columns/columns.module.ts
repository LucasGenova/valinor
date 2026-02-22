import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { CardsService } from '../cards/cards.service';
import { CardsController } from '../cards/cards.controller';

@Module({
  controllers: [ColumnsController, CardsController],
  providers: [ColumnsService, CardsService],
})
export class ColumnsModule {}
