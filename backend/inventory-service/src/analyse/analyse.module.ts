import { Module } from '@nestjs/common';
import { AnalyseController } from './analyse.controller';
import { BullModule } from '@nestjs/bullmq';
import { POST_SPEECH_TO_TEXT_FLOW, SPEECH_TO_TEXT_QUEUE } from './contants';
import { PostSpeechToTextProcessor } from './processor/posts2t.processor';
import { PostS2TFlowService } from './producer/posts2t.flow';
import { SpeechToTextProcessor } from './processor/s2t.processor';
import { AnalyseService } from './analyse.service';
import { LlmProcessor } from './processor/llm.processor';
import { GlossaryProcessor } from './processor/glossary.processor';
import { SummarizerProcessor } from './processor/summarizer.processor';
// file --> s2t (chunks) --> summarizator model + glossary model + ?llm
@Module({
  imports: [
    
    BullModule.registerQueue({
      name: SPEECH_TO_TEXT_QUEUE
    }),
    BullModule.registerFlowProducer({
      name: POST_SPEECH_TO_TEXT_FLOW
    })
  ],
  controllers: [AnalyseController],
  providers: [
    AnalyseService, 
    PostSpeechToTextProcessor, 
    SpeechToTextProcessor,
    PostS2TFlowService,
    GlossaryProcessor,
    LlmProcessor,
    SummarizerProcessor
  ]
})
export class AnalyseModule {}
