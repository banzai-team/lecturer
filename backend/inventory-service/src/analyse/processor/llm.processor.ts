import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { LLM_CHILD } from "../contants";
import { Logger } from "@nestjs/common";
import { Job } from 'bullmq';

@Processor(LLM_CHILD)
export class LlmProcessor extends WorkerHost {

    private readonly logger = new Logger(LlmProcessor.name);
    
    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.debug('prcessing llm...')
        // do some stuff
    }

    @OnWorkerEvent('completed')
    onCompleted() {
        this.logger.debug('onCompleted...')
        // do some stuff
    }
    
    @OnWorkerEvent('error')
    onError({message}) {
        this.logger.error(`An error occured::${message}`);
        // do some stuff
    }
}