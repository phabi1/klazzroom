import { registerAs } from '@nestjs/config';

export const config = registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || 'localhost',
  env: process.env.NODE_ENV,
  prefix: process.env.APP_PREFIX || '',
}));
