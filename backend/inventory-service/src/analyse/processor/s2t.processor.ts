import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { POST_SPEECH_TO_TEXT_FLOW, SPEECH_TO_TEXT_QUEUE } from "../contants";
import { Logger } from "@nestjs/common";
import { Job } from 'bullmq';
import { TriggerAnalyse } from "../analyse.service";
import { PostS2TFlowService } from "../producer/posts2t.flow";
import { error } from "console";
import { InventoryService } from "src/inventory/inventory.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Analyse, AnalyseJob } from "../analyse.entity";
import { Repository } from "typeorm";

@Processor(SPEECH_TO_TEXT_QUEUE)
export class SpeechToTextProcessor extends WorkerHost {

    private readonly logger = new Logger(SpeechToTextProcessor.name);

    constructor(
        private readonly posts2tFlow: PostS2TFlowService,
        private readonly inventoryService: InventoryService,
        @InjectRepository(Analyse) private readonly analyseJobRepository: Repository<Analyse>
        ) {
        super();
    }
    
    async process(job: Job<any, ModelS2tResponse[], string>): Promise<any> {
        this.logger.debug(`Processing s2t request::${job.data.lectureId} lecture::${job.data.lectureId}`);
        
        const chunks = await this.invokeSpeechToTextModel();
        
        this.logger.debug(`s2t::${job.data.uuid} completed with result::${chunks}`);
        return chunks;
    }

    private async invokeSpeechToTextModel(): Promise<ModelS2tResponse[]> {
        return [
            {
                timestamp: [0, 100],
                text: 'abc'
            }
        ];
    }

    @OnWorkerEvent('active')
    async onActive(job: Job<any, ModelS2tResponse[], string>) {
        this.logger.debug(`job is active::${job.data.lectureId}`);
        
    }

    @OnWorkerEvent('completed')
    async onCompleted(job: Job<any, ModelS2tResponse[], string>) {
        const {data, returnvalue} = job;
        this.logger.debug(`on completed::${JSON.stringify(data)} returnvalue::${JSON.stringify(returnvalue)}`);
        
        await this.inventoryService.createLectureTextChunks(data.lectureId, returnvalue.map(r => ({text: r.text, from: r.timestamp[0], to: r.timestamp[1]})));
        
        this.posts2tFlow.analyse(job.id, data.lectureId);
    }

    
    @OnWorkerEvent('error')
    onError({message}) {
        this.logger.error(`An error occured::${message}`);
    }
}

export interface ModelS2tResponse {
    timestamp: number[],
    text: string
}

export interface ModelS2tRequest {

}