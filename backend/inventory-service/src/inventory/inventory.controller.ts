import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InventoryService } from './inventory.service';
import { Lecture } from './inventory.entity';
import { Page } from 'src/commons/page';

@Controller('inventory')
export class InventoryController {

    constructor(private readonly inventoryService: InventoryService) { }

    @Get()
    async listLectures(
        @Query('offset') offset: number = 0,
        @Query('size',) size: number = 10): Promise<Page<Lecture>> {
            return await this.inventoryService.listLecturepage({
                offset,
                size,
                sortBy: undefined,
                sort: 'desc'
            })
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createLecture(
        @UploadedFile() file: Express.Multer.File,
        @Body() { name }: CreateLectureRequest): Promise<Lecture> {
        const lecture = await this.inventoryService.createLecture(name, file);
        return lecture;
    }

    @Get(':id')
    async getLecture(@Param('id') id: any): Promise<Lecture> {
        return await this.inventoryService.getLectureById(id);
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