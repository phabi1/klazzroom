import { lastValueFrom } from "rxjs";
import { IConfigLoader } from "../interfaces/config-loader.interface";
import { HttpClient } from "@angular/common/http";

export class HttpConfigLoader implements IConfigLoader {
  constructor(private readonly http: HttpClient, private readonly endpoint: string) {}

  load(): Promise<Record<string, unknown>> {
    return lastValueFrom(this.http.get<Record<string, unknown>>(this.endpoint));
  }
}