import { LoggerService } from '@klazzroom/libs-server-logging';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);

  app.useLogger(loggerService);

  app.enableCors(configService.getOrThrow('security.cors'));

  const globalPrefix = configService.getOrThrow<string>('app.prefix');
  app.setGlobalPrefix(globalPrefix);

  const port = configService.getOrThrow<number>('app.port');
  const host = configService.getOrThrow<string>('app.host');

  await app.listen(port, host);
  loggerService.log(
    `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
