import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../../services/editor.service';
import { PluginInfo } from '../../editor/interfaces/plugin-info.interface';

@Component({
  selector: 'lib-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditorService],
})
export class EditorComponent implements AfterViewInit {
  public readonly editorService: EditorService = inject(EditorService);
  private readonly ngZone = inject(NgZone);

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {

      window.addEventListener('resize', () => {
        this.onWindowResize();
      });

      this.initEditor();
    });


  }

  command(name: string, payload = {}): void {
    this.editorService.getInstance().command(name, payload);
  }

  private initEditor(): void {
    const canvasId = 'canvas';
    const plugins: PluginInfo[] = [
      { name: 'workspace', options: { width: 320, height: 240 } },
      { name: 'text', options: {} },
      { name: 'autoSave', options: {} },
    ];
    this.editorService.init(canvasId, plugins);

    const instance = this.editorService.getInstance();
    instance.load();
  }

  private onWindowResize(): void {
    const instance = this.editorService.getInstance();
    instance.canvas.setDimensions(
      {
        width: '100%',
        height: '100%',
      },
      { cssOnly: true }
    );
  }
}
