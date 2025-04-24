import { Item } from './item.interface';

export interface DataloaderService<T extends Item> {
  itemsByIds: (ids: string[]) => Promise<T[]>;
}
