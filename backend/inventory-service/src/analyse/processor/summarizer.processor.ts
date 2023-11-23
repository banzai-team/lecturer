import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { LLM_CHILD, SUMMARIZER_CHILD } from "../contants";
import { Logger } from "@nestjs/common";
import { Job } from 'bullmq';

@Processor(SUMMARIZER_CHILD)
export class SummarizerProcessor extends WorkerHost {

    private readonly logger = new Logger(SummarizerProcessor.name);
    
    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.debug('processing glossary...')
        // do some stuff
    }

    @OnWorkerEvent('completed')
    onCompleted() {
        this.logger.debug('onCompleted...')
        // do some stuff
    }
}