import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordingModule } from './recording/recording.module';
import { LectureModule } from './lecture/lecture.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get<DataSourceOptions>('db'),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({connection: configService.get('bullMq')}),
      inject: [ConfigService],
    }),
    HealthModule,
    RecordingModule, 
    LectureModule, FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
