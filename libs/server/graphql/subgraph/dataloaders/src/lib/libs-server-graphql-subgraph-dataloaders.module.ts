import { Module } from '@nestjs/common';
import { DataloaderRegistryService } from './services/dataloader-registry.service';
import { ConfigurableModuleClass } from './dataloaders.module-definition';

@Module({
  providers: [DataloaderRegistryService],
  exports: [DataloaderRegistryService],
})
export class LibsServerGraphqlSubgraphDataloadersModule extends ConfigurableModuleClass {}
