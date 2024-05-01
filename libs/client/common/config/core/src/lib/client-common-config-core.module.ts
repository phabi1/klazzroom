import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';
import { configLoaderFactory } from './factories/config-loader.factory';

@NgModule({
  imports: [CommonModule],
})
export class ClientCommonConfigModule {
  static forRoot(options: { loader: Provider }) {
    return {
      ngModule: ClientCommonConfigModule,
      providers: [
        options.loader,
        { provide: ConfigService, useClass: ConfigService },
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [ConfigService],
          useFactory: configLoaderFactory
        },
      ],
    };
  }
}
