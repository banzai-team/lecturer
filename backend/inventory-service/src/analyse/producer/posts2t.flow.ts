import { InjectFlowProducer, OnWorkerEvent } from "@nestjs/bullmq";
import { Injectable, Logger } from "@nestjs/common";
import { FlowProducer } from 'bullmq';
import { GLOSSARY_CHILD, LLM_CHILD, POST_SPEECH_TO_TEXT_FLOW, SPEECH_TO_TEXT_QUEUE, SUMMARIZER_CHILD } from "../contants";

@Injectable()
export class PostS2TFlowService {
    private readonly logger = new Logger(PostS2TFlowService.name);

    constructor(
        @InjectFlowProducer(POST_SPEECH_TO_TEXT_FLOW) private postS2TFlowProducer: FlowProducer,
    ) { }

    async analyse(jobId: string, lectureId: string) {
        this.logger.debug('Putting root job...')
        const job = await this.postS2TFlowProducer.add({
            name: 'root-job',
            queueName: POST_SPEECH_TO_TEXT_FLOW,
            data: {

            },
            opts: {
                jobId
            },
            children: [
                {
                    name: 'bob',
                    data: { idx: 0, foo: 'bar' },
                    queueName: LLM_CHILD,
                    opts: {
                        jobId
                    }
                },
                {
                    name: 'popa',
                    data: { idx: 0, foo: 'baz' },
                    queueName: SUMMARIZER_CHILD,
                    opts: {
                        jobId
                    }
                },
                {
                    name: 'gloss',
                    data: { idx: 0, foo: 'baz' },
                    queueName: GLOSSARY_CHILD,
                    opts: {
                        jobId
                    }
                },
            ],
        });
        this.logger.debug(`job::${JSON.stringify(job)}`)
    }

    async getJobState(id: string) {
        const res =  await this.postS2TFlowProducer.getFlow({
            id,
            queueName: POST_SPEECH_TO_TEXT_FLOW
        })
        this.logger.debug(`${JSON.stringify(res)}`)
        return res;
    }

    @OnWorkerEvent('completed')
    onCompleted() {
        this.logger.debug('onCompleted...')
    }

    @OnWorkerEvent('error')
    onError({message}) {
        this.logger.error(`An error occured::${message}`);
    }
}

