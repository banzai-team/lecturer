import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recording')
export class RecordingController {

    @Get('/download/:id')
    async downloadRecording() {
        return {

        }
    }
}
