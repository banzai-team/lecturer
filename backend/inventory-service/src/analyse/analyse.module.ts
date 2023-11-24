import { Module } from '@nestjs/common';
import { AnalyseController } from './analyse.controller';
import { BullModule } from '@nestjs/bullmq';
import { ANALYSE_QUEUE, POST_SPEECH_TO_TEXT_FLOW, SPEECH_TO_TEXT_QUEUE } from './contants';
import { AnalyseService } from './analyse.service';
import { InventoryModule } from 'src/inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analyse, AnalyseJob } from './analyse.entity';
// file --> s2t (chunks) --> summarizator model + glossary model + ?llm
@Module({
  imports: [
    TypeOrmModule.forFeature([Analyse, AnalyseJob]),
    InventoryModule,
    BullModule.registerQueue({
      name: SPEECH_TO_TEXT_QUEUE
    }),
    BullModule.registerFlowProducer({
      name: ANALYSE_QUEUE
    }),
    BullModule.registerFlowProducer({
      name: POST_SPEECH_TO_TEXT_FLOW
    })
  ],
  controllers: [AnalyseController],
  providers: [
    AnalyseService,
  ]
})
export class AnalyseModule {}
