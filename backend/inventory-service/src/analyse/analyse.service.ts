import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { SPEECH_TO_TEXT_QUEUE } from './contants';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryService } from 'src/inventory/inventory.service';
import { Analyse } from './analyse.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AnalyseService {

    private readonly logger = new Logger(AnalyseService.name);

    constructor(
        @InjectQueue(SPEECH_TO_TEXT_QUEUE) private readonly s2tQueue: Queue,
        private readonly inventoryService: InventoryService,
        @InjectRepository(Analyse) private readonly analyseJobRepository: Repository<Analyse>
    ) {}

    public async analyse(lectureId: string): Promise<Analyse> {
        this.logger.debug(`Analyse lecture::${lectureId}...`);
        const lecture = await this.inventoryService.getLectureById(lectureId);
        if (!lecture) {
            throw new HttpException('NOT FOUND', 404);
        }
        if (!lecture.file) {
            throw new HttpException('FILE NOT FOUND', 404);
        }

        return null;
    }

    public async progress(id: string) {
        // return this.postFlow.getJobState(id)
    }
}

export interface TriggerAnalyse {
    uuid: string,
    lectureId: string
}
