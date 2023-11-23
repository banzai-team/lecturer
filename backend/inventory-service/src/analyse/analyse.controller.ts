import { Controller, Get, Inject, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnalyseService } from './analyse.service';
import { PostS2TFlowService } from './producer/posts2t.flow';
import { randomUUID } from 'crypto';

@Controller('recording')
export class AnalyseController {

    constructor(private readonly recordingService: AnalyseService) { }

    @Get('/download/:id')
    async downloadRecording() {
        return {

        }
    }

    @Post(':id/analyse')
    async analyse(): Promise<string> {
        const subscriptionId = randomUUID();
        await this.recordingService.analyse({
            uuid: subscriptionId,
            recording: 'abc.mp3'
        });
        return subscriptionId;
    }

}
