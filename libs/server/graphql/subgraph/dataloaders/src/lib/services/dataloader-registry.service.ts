import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Type,
} from '@nestjs/common';
import DataLoader from 'dataloader';
import { DataloaderService } from '../interfaces/dataloader-service.interface';
import { Item } from '../interfaces/item.interface';
import { MODULE_OPTIONS_TOKEN } from '../dataloaders.module-definition';
import { DataloadersModuleOptions } from '../interfaces/dataloaders-module-options.interface';

@Injectable()
export class DataloaderRegistryService
  implements OnModuleInit, OnModuleDestroy
{
  private loaders: Map<string, DataloaderService<Item>> = new Map();
  private instances: Map<string, DataLoader<unknown, unknown, unknown>> =
    new Map();

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: DataloadersModuleOptions
  ) {}

  onModuleInit(): void {
    this.options.loaders.forEach((loader) => {
      this.register(loader.name, loader.loader);
    });
  }
  
  onModuleDestroy(): void {
    this.clear();
  }

  register(name: string, loader: any): void {
    if (this.loaders.has(name)) {
      throw new Error(`Loader with name ${name} is already registered.`);
    }
    this.loaders.set(name, loader);
  }

  get(name: string): any {
    const loader = this.loaders.get(name);
    if (!loader) {
      throw new Error(`Loader with name ${name} is not registered.`);
    }
    if (this.instances.has(name)) {
      return this.instances.get(name);
    }

    const batchFn: any = async (ids: string[]) => {
      const items = await loader.itemsByIds(ids.map((id) => id));
      const itemsMap = new Map(items.map((item) => [item.id, item]));
      return ids.map((id) => itemsMap.get(id) || null);
    };

    const instance = new DataLoader<string, Item>(batchFn);
    this.instances.set(name, instance);
    return instance;
  }

  clear(): void {
    this.instances.clear();
    this.loaders.clear();
  }
}
