import { Editor } from '../editor';

export interface Plugin<O = unknown> {
  editor: Editor;
  init(options: O): void;
  load(): void;
  unload(): void;
}
