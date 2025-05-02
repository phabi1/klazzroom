import { Point, Rect } from 'fabric';
import { Plugin } from '../../interfaces/plugin.interface';
import { PluginBase } from '../../model/plugin-base.model';
import { Editor } from '../../editor';

type WorkspacePluginOptions = {
  width: number;
  height: number;
};

export default class WorkspacePlugin
  extends PluginBase<WorkspacePluginOptions>
  implements Plugin<WorkspacePluginOptions>
{
  private el!: Rect;
  private mask!: Rect;
  private _isDragging = false;
  private _lastPos = [0, 0];

  override init(editor: Editor, options: WorkspacePluginOptions): void {
    super.init(editor, options);
    this.setupCommands();
  }

  /**
   * Load the plugin and create a rectangle representing the workspace.
   */
  load(): void {
    this.createArtboard();

    this.bindEvents();
  }

  /**
   * Unload the plugin and remove the workspace rectangle from the canvas.
   */
  unload(): void {
    const canvas = this.editor.canvas;
    if (this.el) {
      canvas.remove(this.el);
    }

    this.unbindEvents();
  }

  private setupCommands() {
    this.editor.registerCommand('zoomIn', () => this.zoomIn());
    this.editor.registerCommand('zoomOut', () => this.zoomOut());
    this.editor.registerCommand('zoomReset', () => this.zoomReset());
  }

  private bindEvents() {
    const canvas = this.editor.canvas;
    canvas.on('mouse:wheel', this.onMouseWheel.bind(this));
    canvas.on('mouse:down', this.onMouseDown.bind(this));
    canvas.on('mouse:up', this.onMouseUp.bind(this));
    canvas.on('mouse:move', this.onMouseMove.bind(this));
  }

  private unbindEvents() {
    const canvas = this.editor.canvas;
    canvas.off('mouse:wheel', this.onMouseWheel.bind(this));
    canvas.off('mouse:down', this.onMouseDown.bind(this));
    canvas.off('mouse:up', this.onMouseUp.bind(this));
    canvas.off('mouse:move', this.onMouseMove.bind(this));
  }

  /**
   * Create a rectangle representing the workspace and add it to the canvas.
   * The rectangle is not selectable or resizable.
   */
  private createArtboard() {
    const { width, height } = this.options;
    const canvas = this.editor.canvas;

    const rect = new Rect({
      left: 0,
      top: 0,
      width,
      height,
      fill: '#ffffff',
      selectable: false,
      hasControls: false,
    });

    canvas.add(rect);
    this.el = rect;
    canvas.renderAll();
  }

  private zoomIn() {
    const canvas = this.editor.canvas;
    canvas.setZoom(canvas.getZoom() * 1.1);
  }
  private zoomOut() {
    const canvas = this.editor.canvas;
    canvas.setZoom(canvas.getZoom() / 1.1);
  }
  private zoomReset() {
    const canvas = this.editor.canvas;
    canvas.setZoom(1);
  }

  private onMouseWheel(opt: any) {
    const delta = opt.e.deltaY;
    const zoom = this.editor.canvas.getZoom();
    const newZoom = zoom * 0.999 ** delta;

    this.editor.canvas.zoomToPoint(
      { x: opt.e.offsetX, y: opt.e.offsetY } as Point,
      newZoom
    );
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }

  private onMouseDown(opt: any) {
    if (opt.e.altKey === true) {
      this._isDragging = true;
      this._lastPos = [opt.e.clientX, opt.e.clientY];
    }
  }

  private onMouseUp(opt: any) {
    const canvas = this.editor.canvas;
    if (this._isDragging) {
      canvas.setViewportTransform(canvas.viewportTransform);
    }
    this._isDragging = false;
  }

  private onMouseMove(opt: any) {
    const canvas = this.editor.canvas;
    if (this._isDragging) {
      const vpt = canvas.viewportTransform;
      vpt[4] += opt.e.clientX - this._lastPos[0];
      vpt[5] += opt.e.clientY - this._lastPos[1];
      canvas.requestRenderAll();
      this._lastPos = [opt.e.clientX, opt.e.clientY];
    }
  }
}
