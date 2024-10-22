import { IPlugin } from '@klazzroom/libs-api-gateway-plugin';
import { Type } from '@nestjs/common';

class PluginManager {
  private types: Record<string, () => Promise<Type<IPlugin<unknown>>>> = {
    cors: () =>
      import('@klazzroom/libs-api-gateway-plugin-cors').then(
        (m) => m.CorsPlugin
      ),
    keycloak: () =>
      import('@klazzroom/libs-api-gateway-plugin-keycloak').then(
        (m) => m.KeycloakPlugin
      ),
  };

  async resolve(name: string): Promise<IPlugin<unknown>> {
    const type = await this.types[name]();
    return new type();
  }
}

export default new PluginManager();
