import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glossary, GlossaryItem, Lecture, LectureText, LectureTextChunk } from './inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lecture, Glossary, GlossaryItem, LectureText, LectureTextChunk]),
    FileModule.register({
      dest: 'uploads'
    })
  ],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
