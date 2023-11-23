import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { POST_SPEECH_TO_TEXT_FLOW, SPEECH_TO_TEXT_QUEUE } from "../contants";
import { Job } from 'bullmq';
import { Logger } from "@nestjs/common";

@Processor(POST_SPEECH_TO_TEXT_FLOW)
export class RecordingProcessor extends WorkerHost {

    private readonly logger = new Logger(RecordingProcessor.name);
    
    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.debug('prcessing...')
        // do some stuff
    }

    @OnWorkerEvent('completed')
    onCompleted() {
        this.logger.debug('onCompleted...')
        // do some stuff
    }
}