import { LibsServerLoggingModule } from '@klazzroom/libs-server-logging';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../config/app.config';
import { AccountModule } from './domain/account/account.module';
import { GraphqlModule } from './infra/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    LibsServerLoggingModule.forRoot({
      appName: 'server-accounts',
    }),
    AccountModule,
    GraphqlModule,
  ],
})
export class AppModule {}
