import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AnalyseStatus } from './lecture.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('lecture')
export class LectureController {

    @Get()
    async listLectures() {

    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createLecture(
        @UploadedFile() file: Express.Multer.File,
        @Body() {name}: CreateLectureRequest): Promise<LectureDto> {
        return {
            id: 88,
            name,
            analyseStatus: AnalyseStatus.NOT_STARTED
        }
    }

    @Get(':id')
    async getLecture(@Param() id: any): Promise<LectureDto> {
        return {
            id: 88,
            name: 'Arrays',
            analyseStatus: AnalyseStatus.NOT_STARTED,
            recording: 'some_recording.mp3'
        }
    }

    
    @Post(':id/recording')
    @UseInterceptors(FileInterceptor('file'))
    async uploadLectureRecording(
        @UploadedFile() file: Express.Multer.File,): Promise<LectureDto> {
        return {
            id: 88,
            name: 'Arrays',
            analyseStatus: AnalyseStatus.NOT_STARTED,
            recording: 'some_recording.mp3'
        }
    }

    @Post(':id/analyse')
    async analyseLecture() {

    }
}

interface CreateLectureRequest {
    name: string
}


interface CreateLectureResponse {
    id: any
    name: string
}

interface LectureDto {
    id: any
    name: string
    recording?: string
    analyseStatus: AnalyseStatus
}