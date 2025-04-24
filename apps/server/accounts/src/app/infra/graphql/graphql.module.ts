import {
  AuthService,
  LibsServerGraphqlSubgraphAuthModule,
} from '@klazzroom/libs-server-graphql-subgraph-auth';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { forwardRef, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountModule } from '../../domain/account/account.module';
import { MeResolver } from './resolvers/me.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [LibsServerGraphqlSubgraphAuthModule],
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: {
          federation: 2,
        },
        context: authService.handleAuth.bind(authService),
      }),
      inject: [AuthService],
    }),
    forwardRef(() => AccountModule),
  ],
  providers: [MeResolver],
})
export class GraphqlModule {}
