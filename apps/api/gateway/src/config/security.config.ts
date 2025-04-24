import { registerAs } from '@nestjs/config';

export const config = registerAs('security', () => ({
  cors: {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  },
}));
