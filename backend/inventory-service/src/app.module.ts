import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordingModule } from './recording/recording.module';
import { LectureModule } from './lecture/lecture.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    HealthModule,
    RecordingModule, 
    LectureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
