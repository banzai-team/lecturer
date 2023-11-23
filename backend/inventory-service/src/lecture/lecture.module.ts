import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glossary, GlossaryItem, Lecture, LectureText, LectureTextChunk } from './lecture.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture, Glossary, GlossaryItem, LectureText, LectureTextChunk]),
    FileModule.register({
      dest: 'uploads'
    })
  ],
  controllers: [LectureController],
  providers: [LectureService]
})
export class LectureModule {}
