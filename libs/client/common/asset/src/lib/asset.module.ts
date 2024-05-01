import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  imports: [],
})
export class AssetModule {
  static forRoot(): ModuleWithProviders<AssetModule> {
    return {
      ngModule: AssetModule,
      providers: [],
    };
  }
}
