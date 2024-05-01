export interface ConfigLoader {
  loadSettings(): Promise<Record<string, unknown>>;
}
