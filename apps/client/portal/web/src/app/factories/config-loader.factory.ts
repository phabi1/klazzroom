import { HttpClient } from '@angular/common/http';
import { AssetService } from '@klazzroom/client-common-asset';
import { ConfigHttpLoader } from '@klazzroom/client-common-config-loader-http';

export function createConfigLoader(
  httpClient: HttpClient,
  assetService: AssetService
) {
  console.log('config')
  return new ConfigHttpLoader(
    httpClient,
    assetService.toUrl('assets/config.json')
  );
}
