import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DataloadersModuleOptions } from './interfaces/dataloaders-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DataloadersModuleOptions>()
    .setClassMethodName('register')
    .build();
