/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import databaseSetup from './app/setups/database.setup';
import routesSetup from './app/setups/routes.setup';

async function bootstrap() {
  const app = express();

  await databaseSetup(app);
  await routesSetup(app);

  const port = +process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';
  const server = app.listen(port, host, () => {
    console.log(`Listening at http://${host}:${port}`);
  });
  server.on('error', console.error);
}

bootstrap();
