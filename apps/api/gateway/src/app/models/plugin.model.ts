import { Schema } from "mongoose";

export interface IPlugin {
    name: string;
    options: unknown;
}

export const PluginSchema = new Schema({});