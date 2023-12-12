import { HttpClient } from '@angular/common/http';
import { ConfigHttpLoader } from '@klazzroom/client-common-config-loader-http';

export function createConfigLoader(httpClient: HttpClient) {
  return new ConfigHttpLoader(httpClient, 'assets/config.json');
}
