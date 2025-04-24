import { LoggerService } from '@klazzroom/libs-server-logging';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  const configService = app.get<ConfigService>(ConfigService);
  const loggerService = app.get<LoggerService>(LoggerService);

  app.useLogger(loggerService);

  const globalPrefix = configService.getOrThrow('app.prefix');
  app.setGlobalPrefix(globalPrefix);

  const port = configService.getOrThrow('app.port');
  const host = configService.getOrThrow('app.host');

  await app.listen(port, host);
  loggerService.log(
    `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
