import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config as appConfig } from '../config/app.config';
import { config as databaseConfig } from '../config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableModule } from './domain/timetable/timetable.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphqlModule } from './infra/graphql/graphql.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, databaseConfig] }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    CqrsModule.forRoot(),
    TimetableModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
