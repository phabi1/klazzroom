import { IPlugin } from '@klazzroom/libs-api-gateway-plugin';

class PluginManager {
  private types: Record<string, any> = {};

  resolve(name: string): IPlugin<unknown> {
    return this.types[name];
  }
}

export default new PluginManager();
