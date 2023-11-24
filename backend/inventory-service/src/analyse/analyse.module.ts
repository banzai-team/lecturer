import { DynamicModule, Module } from '@nestjs/common';
import { AnalyseController } from './analyse.controller';
import { AnalyseService } from './analyse.service';
import { InventoryModule } from 'src/inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analyse, AnalyseJob } from './analyse.entity';
// file --> s2t (chunks) --> summarizator model + glossary model + ?llm
@Module({})
export class AnalyseModule {
  static register(config: AnalyseModuleConfig): DynamicModule {
    return {
      module: AnalyseModule,
      imports: [
        TypeOrmModule.forFeature([Analyse, AnalyseJob]),
        InventoryModule,
      ],
      controllers: [AnalyseController],
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: config,
        },
        AnalyseService,
      ]
    };
  }
}

export interface AnalyseModuleConfig {
  workerUrl: string
} 


export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';
