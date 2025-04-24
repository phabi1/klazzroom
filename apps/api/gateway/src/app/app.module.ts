import { LibsServerLoggingModule } from '@klazzroom/libs-server-logging';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { config as appConfig } from '../config/app.config';
import {
  config as authConfig,
  validate as validateAuth,
} from '../config/auth.config';
import { config as securityConfig } from '../config/security.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './infra/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, securityConfig, authConfig],
      validationSchema: Joi.object({
        ...validateAuth(),
      }),
    }),
    LibsServerLoggingModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        appName: configService.getOrThrow<string>('app.name'),
      }),
      inject: [ConfigService],
    }),
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
