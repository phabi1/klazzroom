import { registerAs } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import Joi from 'joi';

export const config = registerAs(
  'database',
  (): MongooseModuleFactoryOptions => ({
    uri: process.env.MONGODB_URI,
  })
);

export function validate() {
  return {
    MONGODB_URI: Joi.string().required(),
  };
}
