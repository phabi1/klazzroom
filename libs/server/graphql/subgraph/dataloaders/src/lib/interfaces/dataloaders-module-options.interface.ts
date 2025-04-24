import { DataloaderService } from './dataloader-service.interface';
import { Item } from './item.interface';

export interface DataloadersModuleOptions {
  loaders: {
    name: string;
    loader: DataloaderService<Item>;
  }[];
}
