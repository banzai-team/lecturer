import { Inject, Injectable, Logger } from '@nestjs/common';
import { SPEECH_TO_TEXT_QUEUE } from './contants';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';


@Injectable()
export class RecordingService {

    private readonly logger = new Logger(RecordingService.name);

    constructor(
        @InjectQueue(SPEECH_TO_TEXT_QUEUE) private readonly s2tQueue: Queue
    ) {}

    public async analyse(analyse: TriggerAnalyse) {
        this.logger.debug('analyse...')
        const job = await this.s2tQueue.add('sample', analyse);
        this.logger.debug('added job to queue...')
    }
}

export interface TriggerAnalyse {
    uuid: string,
    recording: string
}
