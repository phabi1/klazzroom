import { HttpClient } from '@angular/common/http';
import { ConfigLoader } from '@klazzroom/client-common-config-core';
import { lastValueFrom } from 'rxjs';

export class ConfigHttpLoader implements ConfigLoader {
  constructor(private httpClient: HttpClient, private endpoint: string) {}

  public loadSettings(): Promise<unknown> {
    return lastValueFrom(this.httpClient.get(this.endpoint));
  }
}
