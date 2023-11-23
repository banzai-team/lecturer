import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UploadedFile } from './file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CONFIG_OPTIONS, FileModuleConfig } from './file.module';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {

    private readonly logger = new Logger(FileService.name);

    constructor(@Inject(CONFIG_OPTIONS) private readonly options: FileModuleConfig,
        @InjectRepository(UploadedFile) private readonly fileRepository: Repository<UploadedFile>) { }

    public async saveFile(
        buffer: Buffer,
        filename: string,
        extension: string
    ): Promise<UploadedFile> {
        this.logger.debug(`Saving file::${filename} mimetype::${extension}...`);
        const file = new UploadedFile()
        file.id = randomUUID();
        file.path = this.options.dest;
        file.originalName = filename;
        file.uploadedAt = new Date();
        const savePath = join(this.options.dest, `${filename}${file.id}.${extension}`);
        fs.mkdirSync(this.options.dest, { recursive: true });
        fs.writeFileSync(savePath, buffer);
        this.logger.debug(`File was successfuly saved as::${savePath}`);
        return await this.fileRepository.save(file);
    }
}
