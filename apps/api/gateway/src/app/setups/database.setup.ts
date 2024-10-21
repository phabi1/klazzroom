import { Application } from "express";
import mongoose, { Model } from "mongoose";
import { ConsumerSchema } from "../models/consumer.model";
import { PluginSchema } from "../models/plugin.model";
import { RouteSchema } from "../models/route.model";
import { ServiceSchema } from "../models/service.model";

export default async function (app: Application): Promise<void> {
    const uri = process.env.MONGO_URL;
    await mongoose.connect(uri);
  
    const schemaInfos = [
      { name: 'Service', schema: ServiceSchema },
      { name: 'Route', schema: RouteSchema },
      { name: 'Plugin', schema: PluginSchema },
      { name: 'Consumer', schema: ConsumerSchema },
    ];
  
    const models: Record<string, any> = {};
  
    schemaInfos.forEach((info) => {
      models[info.name] = mongoose.model(info.name, info.schema);
    });
  
    app.set('models', models);
  }