import { IPlugin, IPluginContext } from '@klazzroom/libs-api-gateway-plugin';

export class CorsPlugin implements IPlugin<{}> {
  get name(): string {
    return 'cors';
  }
  get version(): string {
    return '1.0.0';
  }
  load(ctx: IPluginContext, options: {}): Promise<void> {
    throw new Error('Method not implemented.');
  }
  unload(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
