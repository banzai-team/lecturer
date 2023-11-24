import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { SPEECH_TO_TEXT_QUEUE } from './contants';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryService } from 'src/inventory/inventory.service';
import { Analyse } from './analyse.entity';
import { Repository } from 'typeorm';
import { AnalyseModuleConfig, CONFIG_OPTIONS } from './analyse.module';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AnalyseService {

    private readonly logger = new Logger(AnalyseService.name);
    private readonly options: AnalyseModuleConfig;
    constructor(
        private readonly config: ConfigService, 
        private readonly httpService: HttpService,
        private readonly inventoryService: InventoryService,
    ) {
        this.options = {
            workerUrl: config.get('worker').url
        }
    }

    public async analyse(lectureId: string): Promise<string> {
        this.logger.debug(`Analyse lecture::${lectureId}...`);
        const lecture = await this.inventoryService.getLectureById(lectureId);
        if (!lecture) {
            throw new HttpException('NOT FOUND', 404);
        }
        if (!lecture.file) {
            throw new HttpException('FILE NOT FOUND', 404);
        }
        this.logger.debug(`Sending request to work on lecture::${lectureId} with file::${lecture.file.path}`)
        const response = await firstValueFrom(this.httpService.post(this.options.workerUrl, {
            lecture_id: lectureId,
            file_path: lecture.file.path
        }))
        return response.data;
    }

    public async progress(id: string) {
        // return this.postFlow.getJobState(id)
    }
}

export interface TriggerAnalyse {
    uuid: string,
    lectureId: string
}
