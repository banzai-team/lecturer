import { Controller, Get, Inject, Param, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnalyseService } from './analyse.service';
import { PostS2TFlowService } from './producer/posts2t.flow';
import { randomUUID } from 'crypto';

@Controller('analyse')
export class AnalyseController {

    constructor(private readonly analyseService: AnalyseService) { }

    @Get('/download/:id')
    async downloadRecording() {
        return {

        }
    }

    @Post('lecture/:id')
    async analyse(@Param('id') id: string): Promise<string> {
        const subscriptionId = randomUUID();
        await this.analyseService.analyse({
            uuid: subscriptionId,
            lectureId: id
        });
        return subscriptionId;
    }

}
