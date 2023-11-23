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

    async analyse() {
        this.logger.debug('Putting root job...')
        const job = await this.postS2TFlowProducer.add({
            name: 'root-job',
            queueName: POST_SPEECH_TO_TEXT_FLOW,
            data: {

            },
            children: [
                {
                    name: 'bob',
                    data: { idx: 0, foo: 'bar' },
                    queueName: LLM_CHILD,
                },
                {
                    name: 'popa',
                    data: { idx: 0, foo: 'baz' },
                    queueName: SUMMARIZER_CHILD,
                },
                {
                    name: 'gloss',
                    data: { idx: 0, foo: 'baz' },
                    queueName: GLOSSARY_CHILD,
                },
            ],
        });
    }

    @OnWorkerEvent('completed')
    onCompleted() {
        this.logger.debug('onCompleted...')
        // do some stuff
    }

    @OnWorkerEvent('error')
    onError({message}) {
        this.logger.error(`An error occured::${message}`);
        // do some stuff
    }
}

