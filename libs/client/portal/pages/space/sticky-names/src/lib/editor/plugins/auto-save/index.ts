import { Plugin } from '../../interfaces/plugin.interface';
import { PluginBase } from '../../model/plugin-base.model';
import { Storage } from '../../interfaces/storage.interface';

type AutoSavePluginOptions = {
  interval?: number; // Auto-save interval in milliseconds
  storage?: string;
  storageOptions?: {
    [key: string]: any;
  };
};

export default class AutoSavePlugin
  extends PluginBase<AutoSavePluginOptions>
  implements Plugin<AutoSavePluginOptions>
{
  private intervalId: NodeJS.Timeout | null = null;

  override init(options: AutoSavePluginOptions): void {
    options.interval = options.interval || 300000; // Default to 5 minutes
    super.init(options);
  }

  override load(): void {
    this.intervalId = setInterval(() => {
      this.autoSave();
    });
  }
  override unload(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private autoSave() {
    const storageService: Storage = this.editor.service<Storage>('storage');
    if (!storageService) {
      console.error('Storage service not found');
      return;
    }
    const data = this.editor.canvas.toJSON();
    const id = '1';
    if (data && id) {
      storageService.store(id, data);
    } else {
      console.error('No data to auto-save');
    }
  }
}
