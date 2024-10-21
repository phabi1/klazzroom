import { IPluginOptions } from "./plugin-options.interface";

export interface IPlugin<O extends IPluginOptions> {
    get name(): string;
    get version(): string;
    load(options: O): Promise<void>;
    unload(): Promise<void>;
}