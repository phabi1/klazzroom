import { HydratedDocument, Model, Schema, SchemaTypes } from 'mongoose';

export interface IService {
  id: string;
  target: string;
}

export type ServiceModel = Model<IService>;

export type ServiceDocument = HydratedDocument<IService>;

export const ServiceSchema = new Schema({
  target: { type: SchemaTypes.String, required: true },
});
