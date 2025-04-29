export interface Storage {
    setOptions(options: { [key: string]: any }): void;
    store(id: string, data: unknown): void;
}