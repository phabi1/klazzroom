import { Inject, Injectable } from '@angular/core';
import { CONFIG_LOADER } from '../constants/tokens';
import { ConfigLoader } from '../interfaces/config-loader.interface';

@Injectable()
export class ConfigService {
  private settings: Record<string, unknown> = {};

  constructor(@Inject(CONFIG_LOADER) private loader: ConfigLoader) {}

  async init(): Promise<void> {
    const settings = await this.loader.loadSettings();
    this.settings = settings;
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSettings<T = any>(key: string | string[], defaultValue?: T): T {
    if (typeof key === 'string') {
      key = key.split('.');
    }
    let current = this.settings;
    for (const k of key) {
      if (current[k] === undefined) {
        return defaultValue as T;
      }
      current = current[k] as Record<string, unknown>;
    }
    return current as T;
  }
}
