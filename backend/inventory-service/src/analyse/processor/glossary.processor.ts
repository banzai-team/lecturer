import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { GLOSSARY_CHILD, LLM_CHILD } from "../contants";
import { Logger } from "@nestjs/common";
import { Job } from 'bullmq';

@Processor(GLOSSARY_CHILD)
export class GlossaryProcessor extends WorkerHost {

    private readonly logger = new Logger(GlossaryProcessor.name);
    
    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.debug('processing glossary...')
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