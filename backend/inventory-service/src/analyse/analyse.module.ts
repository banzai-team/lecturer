import { Module } from '@nestjs/common';
import { AnalyseController } from './analyse.controller';
import { AnalyseService } from './analyse.service';
import { InventoryModule } from 'src/inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analyse, AnalyseJob } from './analyse.entity';
// file --> s2t (chunks) --> summarizator model + glossary model + ?llm
@Module({
  imports: [
    TypeOrmModule.forFeature([Analyse, AnalyseJob]),
    InventoryModule,
  ],
  controllers: [AnalyseController],
  providers: [
    AnalyseService,
  ]
})
export class AnalyseModule {}
