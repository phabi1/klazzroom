import { Module } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { ConfigurableModuleClass } from './logging.moduel-definition';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LibsServerLoggingModule extends ConfigurableModuleClass {}
