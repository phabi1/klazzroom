import { InjectionToken } from '@angular/core';
import { IConfigLoader } from './interfaces/config-loader.interface';

export const CONFIG_LOADER = new InjectionToken<IConfigLoader>('CONFIG_LOADER');
