import { Model, Schema, SchemaTypes } from 'mongoose';
import { IPlugin } from './plugin.model';

export interface IRoute {
  id: string;
  path: string;
  plugins: IPlugin[];
  methods?: string[];
  serviceId: string;
}

export type RouteModel = Model<IRoute>;

export const RouteSchema = new Schema({
  path: {
    type: SchemaTypes.String,
    required: true,
  },
  methods: {
    type: [SchemaTypes.String],
    required: false,
  },
  plugins: {
    type: [SchemaTypes.Mixed],
    required: false,
  },
  serviceId: {
    type: SchemaTypes.String,
    required: true,
  },
});
