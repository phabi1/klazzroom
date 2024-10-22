import { IPluginContext } from "./plugin-context.interface";
import { IPluginOptions } from "./plugin-options.interface";

export interface IPlugin<O extends IPluginOptions> {
    get name(): string;
    get version(): string;
    load(ctx: IPluginContext, options: O): Promise<void>;
    unload(ctx: IPluginContext): Promise<void>;
}