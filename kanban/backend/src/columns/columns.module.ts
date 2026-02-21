import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { CardsService } from 'src/cards/cards.service';
import { CardsController } from 'src/cards/cards.controller';

@Module({
  controllers: [ColumnsController, CardsController],
  providers: [ColumnsService, CardsService],
})
export class ColumnsModule {}
