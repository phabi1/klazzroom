import { ConfigurableModuleBuilder } from '@nestjs/common';
import { LoggingModuleOptions } from './interfaces/logging-module-options.interface';

export const {ConfigurableModuleClass, MODULE_OPTIONS_TOKEN} = new ConfigurableModuleBuilder<LoggingModuleOptions>()
  .setClassMethodName('forRoot')
  .setExtras({ isGlobal: true }, (definition, extras) => ({
    ...definition,
    global: extras.isGlobal,
  }))
  .build();
