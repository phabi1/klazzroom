import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  prefix = '/';

  toUrl(path: string) {
    return this.prefix + path;
  }
}
