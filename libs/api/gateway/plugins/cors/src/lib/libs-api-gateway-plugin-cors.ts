import { Plugin } from '@klazzroom/libs-api-gateway-plugin';

export class CorsPlugin extends Plugin<void> {
  override get name(): string {
    return 'cors';
  }
  override get version(): string {
    return '1.0.0';
  }

  async load(): Promise<void> {
    this.registerHook('request', {
      name: 'cors',
      handler: (req, res, next) => {
        next();
      },
    });
  }
  unload(): Promise<void> {
    return Promise.resolve();
  }
}
