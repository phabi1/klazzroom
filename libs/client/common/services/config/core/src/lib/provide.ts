import {
  APP_INITIALIZER,
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider
} from '@angular/core';
import { initializeConfig } from './initializers/config.initializer';
import { ConfigService } from './services/config.service';

export function provideConfig(loader: Provider): EnvironmentProviders {
  return makeEnvironmentProviders([
    loader,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [ConfigService],
      multi: true,
    }
  ]);
}
