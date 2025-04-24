import { inject, Injectable } from '@angular/core';
import { CONFIG_LOADER } from '../constants';
import { IConfigLoader } from '../interfaces/config-loader.interface';

@Injectable()
export class ConfigService {
  private loader: IConfigLoader = inject(CONFIG_LOADER);
  private settings: Record<string, unknown> = {};

  async load(): Promise<void> {
    try {
      const settings = await this.loader.load();
      this.settings = settings;
    } catch (error) {
      console.error('Error loading config:', error);
    }
  }

  getSetting<T>(key: string): T | null {
    const parts = key.split('.');
    let current: any = this.settings;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return null;
      }
    }
    return current as T;
  }
}
