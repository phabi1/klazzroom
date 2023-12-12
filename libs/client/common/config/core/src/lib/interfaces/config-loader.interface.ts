export interface ConfigLoader {
  loadSettings(): Promise<unknown>;
}
