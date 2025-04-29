import { Injectable } from '@angular/core';
import { Editor } from '../editor/editor';
import { PluginInfo } from '../editor/interfaces/plugin-info.interface';

@Injectable()
export class EditorService {
  private instance!: Editor;

  init(canvasId: string, plugins: PluginInfo[]): void {
    if (this.instance) {
      console.warn('Editor instance already initialized');
      return;
    }
    this.instance = new Editor();
    this.instance.init(canvasId, plugins);
  }

  getInstance(): Editor {
    if (!this.instance) {
      throw new Error('Editor instance not initialized');
    }
    return this.instance;
  }
}
