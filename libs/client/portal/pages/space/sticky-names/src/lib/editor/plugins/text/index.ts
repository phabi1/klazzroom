import { PluginBase } from '../../model/plugin-base.model';
import fabric from 'fabric';

export default class TextPlugin extends PluginBase<unknown> {
  override init(options: unknown): void {
    super.init(options);
    this.setupCommands();
  }

  load(): void {
    // Nothing to load for this plugin
  }

  unload(): void {
    // Nothing to unload for this plugin
  }

  private setupCommands() {
    this.editor.registerCommand('addText', () => this.addText());
  }

  private addText() {
    const canvas = this.editor.canvas;
    const text = new fabric.IText('Hello World', {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: '#000',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  }
}
