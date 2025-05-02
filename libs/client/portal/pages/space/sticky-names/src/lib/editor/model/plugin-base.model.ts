import { Editor } from '../editor';
import { Plugin } from '../interfaces/plugin.interface';

export abstract class PluginBase<O> implements Plugin<O> {
  private _editor!: Editor;
  protected options!: O;

  get editor(): Editor {
    return this._editor;
  }

  init(editor: Editor, options: O): void {
    this._editor = editor;
    this.options = options;
  }

  abstract load(): void;
  abstract unload(): void;
}
