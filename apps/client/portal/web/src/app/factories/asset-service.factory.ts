import { AssetService } from '@klazzroom/client-common-asset';
import { environment } from '../../environments/environment';

export function createAssetService(localeId: string) {
  const service = new AssetService();
  if (environment.production) {
    service.prefix = '/' + localeId + '/';
  } else {
    service.prefix = '/';
  }
  return service;
}
