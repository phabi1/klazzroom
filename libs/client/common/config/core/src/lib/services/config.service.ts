import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  getSettings<T = any>(key: string | string[], defaultValue = null): T {
    if (typeof key === 'string') {
      key = key.split('.');
    }
    let current = this.settings;
    while (current) {
      const k = key.shift();
      if (k && current[k] !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        current = current[k] as any;
      } else {
        return defaultValue as T;
      }
    }
    return current as T;
  }
}
