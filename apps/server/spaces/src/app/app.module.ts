import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../config/database.config';
import { SpaceModule } from './domain/space/space.module';
import { GraphqlModule } from './infra/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    CqrsModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    SpaceModule,
    GraphqlModule,
  ],
})
export class AppModule {}
