export class PluginManager {
  types: Record<string, () => Promise<any>> = {};

  constructor() {
    this.register('workspace', () =>
      import('../plugins/workspace').then((m) => m.default)
    );
    this.register('text', () =>
      import('../plugins/text').then((m) => m.default)
    );
    this.register('autoSave', () =>
      import('../plugins/auto-save').then((m) => m.default)
    );
    this.register('rules', () =>
      import('../plugins/rules').then((m) => m.default)
    );
  }

  register(name: string, plugin: () => Promise<any>): void {
    if (this.types[name]) {
      console.warn(`Plugin ${name} already registered`);
      return;
    }
    this.types[name] = plugin;
  }

  resolve(plugin: string): Promise<any> {
    const pluginClass = this.types[plugin];
    if (!pluginClass) {
      return Promise.reject(new Error(`Plugin ${plugin} not found`));
    }
    return pluginClass();
  }
}
