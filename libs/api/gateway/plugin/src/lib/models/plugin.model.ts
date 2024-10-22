import { Application } from 'express';
import { PluginHook } from '../interfaces/plugin-hook.interface';
import { IPlugin } from '../interfaces/plugin.interface';

export abstract class Plugin<O> implements IPlugin<O> {
  private _hooks: Record<string, PluginHook[]> = {};

  get name(): string {
    throw new Error('Method not implemented.');
  }
  get version(): string {
    throw new Error('Method not implemented.');
  }

  app!: Application;

  getHooks(name: string): PluginHook[] {
    return this._hooks[name] || [];
  }

  protected registerHook(name: string, hook: PluginHook): void {
    if (!this._hooks[name]) {
      this._hooks[name] = [];
    }

    this._hooks[name].push(hook);
    this._hooks[name] = this._hooks[name].sort(
      (a, b) => (a.priority || 0) - (b.priority || 0)
    );
  }

  protected unregisterHook(name: string, hook: PluginHook): void {
    if (!this._hooks[name]) {
      return;
    }

    this._hooks[name] = this._hooks[name].filter((h) => h !== hook);
  }

  abstract load(options: O): Promise<void>;
  abstract unload(): Promise<void>;
}
