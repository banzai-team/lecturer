import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordingModule } from './recording/recording.module';
import { LectureModule } from './lecture/lecture.module';

@Module({
  imports: [RecordingModule, LectureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
