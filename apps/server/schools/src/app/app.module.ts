import { LibsServerLoggingModule } from '@klazzroom/libs-server-logging';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';
import appConfig from '../config/app.config';
import {
  config as databaseConfig,
  validate as validateDatabase,
} from '../config/database.config';
import { CourseModule } from './domain/course/course.module';
import { SkillModule } from './domain/skill/skill.module';
import { GradeModule } from './domain/grade/grade.module';
import { GraphqlModule } from './infra/graphql/graphql.module';
import { MessagesModule } from './infra/messages/messages.module';

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
        configService.getOrThrow('database'),
      inject: [ConfigService],
    }),
    CqrsModule.forRoot(),
    CourseModule,
    SkillModule,
    GradeModule,
    GraphqlModule,
    MessagesModule,
  ],
})
export class AppModule {}
