import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const config = registerAs('auth', () => ({
  jwt: {
    url: process.env.AUTH_JWT_URL,
  },
}));

export function validate() {
  return {
    AUTH_JWT_URL: Joi.string().uri().required(),
  };
}
