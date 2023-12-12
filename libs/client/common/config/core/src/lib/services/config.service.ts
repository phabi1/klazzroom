import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONFIG_LOADER } from '../constants/tokens';
import { ConfigLoader } from '../interfaces/config-loader.interface';

@Injectable()
export class ConfigService {
  private settings: Record<string, unknown> = {};
  private _initSubject = new BehaviorSubject<boolean>(false);

  public get init$(): Observable<boolean> {
    return this._initSubject.asObservable();
  }

  constructor(@Inject(CONFIG_LOADER) private loader: ConfigLoader) {}

  async init(): Promise<void> {
    this.settings = (await this.loader.loadSettings()) as Record<
      string,
      unknown
    >;
    this._initSubject.next(true);
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSettings<T = any>(key: string | string[]): T {
    if (typeof key === 'string') {
      key = key.split('.');
    }
    let current = this.settings;
    while (current) {
      const k = key.shift();
      if (k) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        current = current[k] as any;
      } else {
        break;
      }
    }
    return current as T;
  }
}
