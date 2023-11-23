import { Inject, Injectable, Logger } from '@nestjs/common';
import { SPEECH_TO_TEXT_QUEUE } from './contants';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AnalyseService {

    private readonly logger = new Logger(AnalyseService.name);

    constructor(
        @InjectQueue(SPEECH_TO_TEXT_QUEUE) private readonly s2tQueue: Queue
    ) {}

    public async analyse(analyse: TriggerAnalyse) {
        this.logger.debug('analyse...')
        const job = await this.s2tQueue.add('analyse', analyse);
        this.logger.debug('added job to queue...')
    }
}

export interface TriggerAnalyse {
    uuid: string,
    lectureId: string
}
