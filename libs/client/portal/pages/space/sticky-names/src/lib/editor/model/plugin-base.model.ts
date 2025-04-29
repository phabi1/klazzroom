import { Editor } from '../editor';
import { Plugin } from '../interfaces/plugin.interface';

export abstract class PluginBase<O> implements Plugin<O> {
  private _editor: Editor;
  protected options!: O;

  constructor(editor: Editor) {
    this._editor = editor;
  }

  get editor(): Editor {
    return this._editor;
  }

  init(options: O): void {
    this.options = options;
  }

  abstract load(): void;
  abstract unload(): void;
}
