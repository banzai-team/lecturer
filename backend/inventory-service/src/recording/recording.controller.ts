import { Controller, Get, Inject, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecordingService } from './recording.service';
import { PostS2TFlowService } from './producer/posts2t.flow';
import { randomUUID } from 'crypto';

@Controller('recording')
export class RecordingController {

    constructor(private readonly recordingService: RecordingService) { }

    @Get('/download/:id')
    async downloadRecording() {
        return {

        }
    }

    @Post(':id/analyse')
    async analyse() {
        await this.recordingService.analyse({
            uuid: randomUUID(),
            recording: 'abc.mp3'
        });
    }

}
