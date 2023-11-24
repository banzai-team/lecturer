import { Injectable, Logger } from '@nestjs/common';
import { Lecture, LectureText, LectureTextChunk } from './inventory.entity';
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
    ) { }

    async createLecture(
        name: string,
        file: Express.Multer.File): Promise<Lecture> {
        this.logger.debug(`Creating lecture::${name}...`);
        const lecture = new Lecture();
        lecture.createdAt = new Date()
        lecture.lectureName = name;
        if (file) {
            lecture.file = await this.fileService.saveFile(file.buffer, file.originalname, "mp3");
        }
        return await this.lectureRepository.save(lecture);
    }

    async listLecturepage(pageable: Pageable): Promise<Page<Lecture>> {
        const [result, total] = await this.lectureRepository.findAndCount({
            order: { createdAt: pageable.sort },
            take: pageable.size,
            skip: pageable.offset,
            relations: {
                file: true
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

    async createLectureTextChunks(lectureId: string, chunks: {text:string, from: number, to: number}[]) {
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
            lectureText.content =  chunks.map(c => c.text).join();
            lectureText.lecture = lecture;
            lecture.textChunks = chunks.map((c, i) => {
                const chunk = new LectureTextChunk();
                chunk.order = i;
                chunk.from = c.from;
                chunk.to = c.to;
                chunk.content = c.text;
                chunk.lecture = lecture;
                return chunk;
            });
            lecture.text = lectureText;
            await this.lectureRepository.save(lecture);
        } else {
            throw new Error(`Lecture::${lectureId} was not found`);
        }
    }
}
