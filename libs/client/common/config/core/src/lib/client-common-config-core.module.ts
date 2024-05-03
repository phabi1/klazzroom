import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { ConfigService } from './services/config.service';

@NgModule({
  imports: [CommonModule],
})
export class ClientCommonConfigModule {
  static forRoot(options: { loader: Provider }) {
    return {
      ngModule: ClientCommonConfigModule,
      providers: [options.loader, ConfigService],
    };
  }
}
