import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InventoryService } from './inventory.service';
import { Lecture } from './inventory.entity';

@Controller('lecture')
export class InventoryController {

    constructor(private readonly lectureService: InventoryService) {}

    @Get()
    async listLectures() {

    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createLecture(
        @UploadedFile() file: Express.Multer.File,
        @Body() {name}: CreateLectureRequest): Promise<LectureDto> {
            const lecture = await this.lectureService.createLecture(name, file);
        return {
            id: lecture.id,
            name: lecture.lectureName,
            createdAt: lecture.createdAt,
            file: lecture?.file?.originalName
        };
    }

    @Get(':id')
    async getLecture(@Param() id: any): Promise<Lecture> {
        return await this.lectureService.getLectureById(id);
    }

    
    @Post(':id/recording')
    @UseInterceptors(FileInterceptor('file'))
    async uploadLectureRecording(
            @UploadedFile() file: Express.Multer.File,): Promise<LectureDto> {
        return {
            id: 88,
            name: 'Arrays',
            file: 'some_recording.mp3',
            createdAt: new Date()
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
    file?: string
    createdAt: Date
}