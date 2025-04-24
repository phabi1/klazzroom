import { registerAs } from '@nestjs/config';

export const config = registerAs('app', () => ({
  name: process.env.APP_NAME || 'app',
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'localhost',
  prefix: process.env.APP_PREFIX || '',
}));
