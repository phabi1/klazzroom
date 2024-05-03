import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || 'production',
  host: process.env.HOST || 'localhost',
  globalPrefix: process.env.GLOBAL_PREFIX || '',
}));
