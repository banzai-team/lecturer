import { Injectable, Logger } from '@nestjs/common';
import { Lecture } from './lecture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class LectureService {

    private readonly logger = new Logger(LectureService.name);

    constructor(
        private readonly fileService: FileService,
        @InjectRepository(Lecture) private readonly lectureRepository: Repository<Lecture>,
    ) { }

    async createLecture(
        name: string,
        file: Express.Multer.File): Promise<Lecture> {
        this.logger.debug(`Creating lecture::${name}...`);
        const lecture = new Lecture();
        lecture.createdAt = new Date()
        lecture.lectureName = name;
        if (file) {
            await this.fileService.saveFile(file.buffer, file.originalname, "mp3");
        }
        return await this.lectureRepository.save(lecture);
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
}
