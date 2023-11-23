import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { POST_SPEECH_TO_TEXT_FLOW, SPEECH_TO_TEXT_QUEUE } from "../contants";
import { Logger } from "@nestjs/common";
import { Job } from 'bullmq';
import { TriggerAnalyse } from "../analyse.service";
import { PostS2TFlowService } from "../producer/posts2t.flow";
import { error } from "console";
import { InventoryService } from "src/inventory/inventory.service";

@Processor(SPEECH_TO_TEXT_QUEUE)
export class SpeechToTextProcessor extends WorkerHost {

    private readonly logger = new Logger(SpeechToTextProcessor.name);

    constructor(private readonly posts2tFlow: PostS2TFlowService,
        private readonly inventoryService: InventoryService
        ) {
        super();
    }
    
    async process(job: Job<TriggerAnalyse, ModelS2tResponse[], string>): Promise<any> {
        this.logger.debug(`Processing s2t request::${job.data.uuid} file::${job.data.lectureId}`);
        
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

    @OnWorkerEvent('completed')
    async onCompleted(job: Job<TriggerAnalyse, ModelS2tResponse[], string>) {
        const {data, returnvalue} = job;
        this.logger.debug(`on completed::${JSON.stringify(data)} returnvalue::${JSON.stringify(returnvalue)}`);
        
        await this.inventoryService.createLectureTextChunks(data.lectureId, returnvalue.map(r => ({text: r.text, from: r.timestamp[0], to: r.timestamp[1]})));
        
        this.posts2tFlow.analyse();
        // do some stuff
    }

    
    @OnWorkerEvent('error')
    onError({message}) {
        this.logger.error(`An error occured::${message}`);
        // do some stuff
    }
}

export interface ModelS2tResponse {
    timestamp: number[],
    text: string
}