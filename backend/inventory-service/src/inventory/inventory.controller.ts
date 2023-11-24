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
        @Body() { name }): Promise<Lecture> {
        const lecture = await this.inventoryService.createLecture(name, file);
        return lecture;
    }

    @Get('lecture/:id')
    async getLecture(@Param('id') id: any): Promise<Lecture> {
        return await this.inventoryService.getLectureById(id);
    }

    @Post('glossary')
    async createGlossary(@Body() { lectureId }): Promise<any> {
        const glossary = await this.inventoryService.createGlossary(lectureId, []);
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

    @Post('lecture/:id/text-chunks')
    async createTextChunks(@Param('id') lectureId: string,
        @Body() chunks: [{ content: string, from: number, to: number }]
    ) {
        const lecture = await this.inventoryService.createLectureTextChunks(lectureId, chunks);
        return lecture.textChunks.map(c => ({id: c.id, from: c.from, to: c.to, order: c.order, content: c.content}));
    }
}