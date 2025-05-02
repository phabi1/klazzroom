import { Canvas } from 'fabric';
import { PluginInfo } from './interfaces/plugin-info.interface';
import { Plugin } from './interfaces/plugin.interface';
import { CommandManager } from './services/command-manager';
import { StorageManager } from './services/storage-manager';
import { PluginManager } from './services/plugin-manager';

export type EditorOptions = {
  storage?: {
    provider?: string;
    options?: unknown;
  };
};

export class Editor {
  private _canvas!: Canvas;
  private plugins: Plugin[] = [];
  private commandManager = new CommandManager();
  private services: Record<string, unknown> = {};

  get canvas(): Canvas {
    return this._canvas;
  }

  async init(
    canvasId: string,
    plugins: PluginInfo[],
    options?: EditorOptions
  ): Promise<void> {
    const canvasEl = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvasEl) {
      throw new Error(`Canvas with id ${canvasId} not found`);
    }

    this._canvas = new Canvas(canvasEl, {
      backgroundColor: '#ccc',
      preserveObjectStacking: true,
      renderOnAddRemove: false,
      controlsAboveOverlay: true,
      width: 800,
      height: 600,
    });

    this._canvas.renderAll();

    await this.setupStorage(options || {});
    await this.setupPlugins(plugins);
  }

  load() {
    this.plugins.forEach((plugin) => {
      plugin.load();
    });
  }

  registerCommand(name: string, fn: () => void) {
    this.commandManager.register(name, fn);
  }

  unregisterCommand(name: string) {
    this.commandManager.unregister(name);
  }

  command(name: string, payload = {}) {
    return this.commandManager.execute(name, payload);
  }

  service<T>(name: string): T {
    const service = this.services[name];
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service as T;
  }

  private async setupStorage(options: EditorOptions): Promise<void> {
    const storageManager = new StorageManager();
    const storageProvider = options?.storage?.provider || 'local';
    const storageOptions = options?.storage?.options || {};
    const storage = await storageManager.resolve(
      storageProvider,
      storageOptions
    );
    this.services['storage'] = storage;
  }

  private async setupPlugins(plugins: PluginInfo[]): Promise<void> {
    const pluginManager = new PluginManager();

    plugins.forEach(({ name: plugin, options }) => {
      pluginManager.resolve(plugin)
        .then((PluginClass) => {
          const pluginInstance = new PluginClass();
          pluginInstance.init(this, options);
          this.plugins.push(pluginInstance);
        })
        .catch((error) => {
          console.error(`Failed to load plugin ${plugin}:`, error);
        });
    });
  }
}
