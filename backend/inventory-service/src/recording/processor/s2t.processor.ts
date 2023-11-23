import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { POST_SPEECH_TO_TEXT_FLOW, SPEECH_TO_TEXT_QUEUE } from "../contants";
import { Logger } from "@nestjs/common";
import { Job } from 'bullmq';
import { TriggerAnalyse } from "../recording.service";
import { PostS2TFlowService } from "../producer/posts2t.flow";

@Processor(SPEECH_TO_TEXT_QUEUE)
export class SpeechToTextProcessor extends WorkerHost {

    private readonly logger = new Logger(SpeechToTextProcessor.name);

    constructor(private readonly posts2tFlow: PostS2TFlowService) {
        super();
    }
    
    async process(job: Job<TriggerAnalyse, any, string>): Promise<any> {
        this.logger.debug(`Processing s2t request::${job.data.uuid} file::${job.data.recording}`);
        
        const chunks = await this.invokeSpeechToTextModel();
        
        this.logger.debug(`s2t::${job.data.uuid} completed with result::${chunks}`);
        return chunks;
    }

    private async invokeSpeechToTextModel() {
        return [
            {
                timestamp: [0, 100],
                text: 'abc'
            }
        ];
    }

    @OnWorkerEvent('completed')
    onCompleted({data, returnvalue}) {
        this.logger.debug(`on completed::${JSON.stringify(data)}`);
        this.posts2tFlow.analyse()
        // do some stuff
    }
}