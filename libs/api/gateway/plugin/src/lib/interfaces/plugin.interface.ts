import { Application } from 'express';
import { PluginHook } from './plugin-hook.interface';

export interface IPlugin<O> {
  get name(): string;
  get version(): string;
  app: Application;
  getHooks(name: string): PluginHook[];
  load(options: O): Promise<void>;
  unload(): Promise<void>;
}
