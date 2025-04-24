import { IConfigLoader } from "../interfaces/config-loader.interface";

export class StaticConfigLoader implements IConfigLoader {
  constructor(private settings: Record<string, unknown>) {}

  load(): Promise<Record<string, unknown>> {
    return new Promise((resolve) => {
      resolve(this.settings);
    });
  }
}