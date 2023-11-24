import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InventoryService } from './inventory.service';
import { Glossary, GlossaryItem, Lecture } from './inventory.entity';
import { Page } from 'src/commons/page';

@Controller('inventory')
export class InventoryController {

    constructor(private readonly inventoryService: InventoryService) { }

    @Get('lecture')
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

    @Post('lecture')
    @UseInterceptors(FileInterceptor('file'))
    async createLecture(
        @UploadedFile() file: Express.Multer.File,
        @Body() { name }: CreateLectureRequest): Promise<Lecture> {
        const lecture = await this.inventoryService.createLecture(name, file);
        return lecture;
    }

    @Get('lecture/:id')
    async getLecture(@Param('id') id: any): Promise<Lecture> {
        return await this.inventoryService.getLectureById(id);
    }


    @Post('lecture/:id/recording')
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

    @Post('glossary')
    async createGlossary( @Body() { lectureId }): Promise<any> {
        const glossary =  await this.inventoryService.createGlossary(lectureId, []);
        return {
            id: glossary.id,
            createdAt: glossary.createdAt
        }
    }

    @Post('glossary/:glossaryId/item')
    async createGlossaryItem(@Param('glossaryId') glossaryId: string, @Body() { term, meaning }): Promise<any> {
        const item = await this.inventoryService.createGlossaryItem(glossaryId, term, meaning)
        return {
            id: item.id,
            term: item.term,
            meaning: item.meaning
        }
    }

    @Put('glossary/:glossaryId/item/:itemId')
    async updateGlossaryItem(
        @Param('glossaryId') glossaryId: string,
        @Param('itemId') itemId: string,
        @Body() { term, meaning }): Promise<any> {
        const item = await this.inventoryService.updateGlossaryItem(glossaryId, itemId, term, meaning);
        return {
            id: item.id,
            term: item.term,
            meaning: item.meaning
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