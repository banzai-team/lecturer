import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordingModule } from './recording/recording.module';
import { LectureModule } from './lecture/lecture.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('bullMq'),
      inject: [ConfigService],
    }),
    HealthModule,
    RecordingModule, 
    LectureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
