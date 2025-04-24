import { LibsServerLoggingModule } from '@klazzroom/libs-server-logging';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import {
  MongooseModule,
  MongooseModuleFactoryOptions
} from '@nestjs/mongoose';
import Joi from 'joi';
import appConfig from '../config/app.config';
import {
  config as databaseConfig,
  validate as validateDatabase,
} from '../config/database.config';
import { SpaceModule } from './domain/space/space.module';
import { GraphqlModule } from './infra/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema: Joi.object({
        ...validateDatabase(),
      }),
    }),
    LibsServerLoggingModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        appName: configService.getOrThrow<string>('app.name'),
        env: configService.getOrThrow<string>('app.env'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database') as MongooseModuleFactoryOptions,
      inject: [ConfigService],
    }),
    CqrsModule.forRoot(),
    SpaceModule,
    GraphqlModule,
  ],
})
export class AppModule {}
