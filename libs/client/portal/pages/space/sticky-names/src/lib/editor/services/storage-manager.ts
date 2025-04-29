import { Storage } from '../interfaces/storage.interface';

export class StorageManager {
  types: { [key: string]: any } = {
    local: () => import('../storages/local').then((m) => m.LocalStorage),
  };

  resolve(name: string, options: { [key: string]: any }): Promise<Storage> {
    const type = this.types[name];
    if (!type) {
      return Promise.reject(new Error(`Storage type "${name}" not found`));
    }

    return type()
      .then((StorageClass: any) => {
        const instance = new StorageClass();
        instance.setOptions(options);
        return instance;
      })
      .catch((error: any) => {
        console.error(`Error loading storage type "${name}":`, error);
        throw error;
      });
  }
}
