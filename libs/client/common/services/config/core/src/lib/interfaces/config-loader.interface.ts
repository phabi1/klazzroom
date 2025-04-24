export interface IConfigLoader {
  load(): Promise<Record<string, unknown>>;
}
