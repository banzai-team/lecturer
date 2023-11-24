import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Glossary, GlossaryItem, Lecture, LectureText, LectureTextChunk } from './inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { FileService } from 'src/file/file.service';
import { Page, Pageable } from 'src/commons/page';

@Injectable()
export class InventoryService {

    private readonly logger = new Logger(InventoryService.name);

    constructor(
        private readonly fileService: FileService,
        @InjectRepository(Lecture) private readonly lectureRepository: Repository<Lecture>,
        @InjectRepository(LectureText) private readonly lectureTextRepository: Repository<LectureText>,
        @InjectRepository(Glossary) private readonly glossaryRepository: Repository<Glossary>,
        @InjectRepository(GlossaryItem) private readonly glossaryItemRepository: Repository<GlossaryItem>,
    ) { }

    async createLecture(
        name: string,
        file: Express.Multer.File): Promise<Lecture> {
        this.logger.debug(`Creating lecture::${name}...`);
        const lecture = new Lecture();
        lecture.createdAt = new Date()
        lecture.lectureName = name;
        if (file) {
            lecture.file = await this.fileService.saveFile(file.buffer, name, file.originalname, "mp3");
        }
        return await this.lectureRepository.save(lecture);
    }

    async listLecturepage(pageable: Pageable): Promise<Page<Lecture>> {
        const [result, total] = await this.lectureRepository.findAndCount({
            order: { createdAt: pageable.sort },
            take: pageable.size,
            skip: pageable.offset,
            relations: {
                file: true,
                glossary: {
                    items: true
                }
            }
        })

        return {
            content: result,
            total
        }
    }

    async getLectureById(id: string): Promise<Lecture> {
        return this.lectureRepository.findOne({
            where: {
                id
            },
            relations: {
                file: true,
            }
        })
    }

    async createLectureTextChunks(lectureId: string, chunks: {content:string, from: number, to: number}[]): Promise<Lecture> {
        if (await this.lectureRepository.exist({
            where: {
                id: lectureId
            }
        })) {
            const lecture = await this.lectureRepository.findOne({
                where: {
                    id: lectureId
                },
                relations: {
                    text: true,
                }
            });
            if (lecture.text) {
                await this.lectureTextRepository.delete(lecture.text)
                lecture.text = null;
            }


            const lectureText: LectureText = new LectureText();
            lectureText.createdAt = new Date();
            lectureText.content =  chunks.map(c => c.content).join();
            lectureText.lecture = lecture;
            lecture.textChunks = chunks.map((c, i) => {
                const chunk = new LectureTextChunk();
                chunk.order = i;
                chunk.from = c.from;
                chunk.to = c.to;
                chunk.content = c.content;
                chunk.lecture = lecture;
                return chunk;
            });
            lecture.text = lectureText;
            return await this.lectureRepository.save(lecture);
        } else {
            throw new HttpException(`Lecture::${lectureId} was not found`, 404);
        }
    }

    async createGlossary(lectureId: string, items: []): Promise<Glossary> {
        const lecture = await this.lectureRepository.findOne({
            where: {
                id: lectureId
            },
            relations: {
                glossary: true
            }
        });
        if (!lecture) {
            throw new HttpException('NOT FOUND', 404);
        }
        if (lecture.glossary) {
            await this.glossaryRepository.delete(lecture.glossary);
        }

        const glossary = new Glossary();
        lecture.glossary = glossary;
        glossary.lecture = lecture;
        glossary.createdAt = new Date();
        return await this.glossaryRepository.save(glossary)
    } 

    async createGlossaryItem(glossaryId: string, term: string, meaning: string): Promise<GlossaryItem> {
        const glossary = await this.glossaryRepository.findOne({
            where: {
                id: glossaryId
            }
        });
        if (!glossary) {
            throw new HttpException('NOT FOUND', 404);
        }
        const item = new GlossaryItem();
        item.term = term;
        item.meaning = meaning;
        item.glossary = glossary;
        return await this.glossaryItemRepository.save(item);
    }

    async updateGlossaryItem(glossaryId: string, itemid: string, term: string, meaning: string): Promise<GlossaryItem> {
        const item = await this.glossaryItemRepository.findOne({
            where: {
                id: itemid,
                glossary: {
                    id: glossaryId
                }
            }
        });
        if (!item) {
            throw new HttpException('NOT FOUND', 404);
        }
        item.term = term;
        item.meaning = meaning;
        return await this.glossaryItemRepository.save(item);
    }
}
