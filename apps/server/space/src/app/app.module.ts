import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from '../config/app.config';
import courseConfig from '../config/course.config';
import databaseConfig from '../config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpaceModule } from './space/space.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, courseConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      useFactory: () => ({
        autoSchemaFile: {
          federation: 2,
        },
      }),
    }),
    SpaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
