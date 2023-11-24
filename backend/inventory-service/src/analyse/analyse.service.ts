import { Inject, Injectable, Logger } from '@nestjs/common';
import { SPEECH_TO_TEXT_QUEUE } from './contants';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryService } from 'src/inventory/inventory.service';
import { Analyse } from './analyse.entity';
import { Repository } from 'typeorm';
import { PostS2TFlowService } from './producer/posts2t.flow';


@Injectable()
export class AnalyseService {

    private readonly logger = new Logger(AnalyseService.name);

    constructor(
        @InjectQueue(SPEECH_TO_TEXT_QUEUE) private readonly s2tQueue: Queue,
        private readonly inventoryService: InventoryService,
        private readonly postFlow: PostS2TFlowService,
        @InjectRepository(Analyse) private readonly analyseJobRepository: Repository<Analyse>
    ) {}

    public async analyse(lectureId: string): Promise<Analyse> {
        this.logger.debug(`Analyse lecture::${lectureId}...`);
        const lecture = this.inventoryService.getLectureById(lectureId);
        const analyseJob = new Analyse();
        analyseJob.lectureId = lectureId;
        analyseJob.startedAt = new Date();
        await this.analyseJobRepository.save(analyseJob);
        const job = await this.s2tQueue.add('s2t', {
            lectureId,
        }, {
            jobId: analyseJob.id
        });
        this.logger.debug('added job to queue...');
        return analyseJob;
    }

    public async progress(id: string) {
        return this.postFlow.getJobState(id)
    }
}

export interface TriggerAnalyse {
    uuid: string,
    lectureId: string
}
