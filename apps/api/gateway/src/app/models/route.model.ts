import { Model, Schema, SchemaTypes } from 'mongoose';
import { IPlugin } from './plugin.model';

export interface IRoute {
  id: string;
  path: string;
  plugins: IPlugin[];
  serviceId: string;
}

export type RouteModel = Model<IRoute>;

export const RouteSchema = new Schema({
  path: {
    type: SchemaTypes.String,
    required: true,
  },
  serviceId: {
    type: SchemaTypes.String,
    required: true,
  },
});
