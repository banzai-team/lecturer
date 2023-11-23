import { Module } from '@nestjs/common';
import { RecordingController } from './recording.controller';

@Module({
  controllers: [RecordingController]
})
export class RecordingModule {}
