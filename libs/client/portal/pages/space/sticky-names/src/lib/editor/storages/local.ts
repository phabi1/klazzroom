import { Storage } from '../interfaces/storage.interface';

export class LocalStorage implements Storage {
  private prefix: string;
  constructor() {
    this.prefix = 'sticky-names';
  }

  setOptions(options: { [key: string]: any }): void {
    if (options['prefix']) {
      this.prefix = options['prefix'];
    }
  }

  store(id: string, data: unknown): void {
    const key = this.formatKey(id);
    localStorage.setItem(key, JSON.stringify(data));
  }

  private formatKey(key: string): string {
    return this.prefix + ':' + key;
  }
}
