import { Editor } from '../editor';

export interface Plugin<O = unknown> {
  init(editor: Editor, options: O): void;
  load(): void;
  unload(): void;
}
