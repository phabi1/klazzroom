import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MeResolver } from './resolvers/me.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
        driver: ApolloFederationDriver,
        autoSchemaFile: {
            federation: 2
        }
      }),
  ],
  providers: [MeResolver],
})
export class GraphqlModule {}
