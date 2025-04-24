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
import { SpaceModule } from '../../domain/space/space.module';
import { MeResolver } from './resolvers/me.resolver';
import { SpaceResolver } from './resolvers/space.resolver';
import { Me } from './types/me.type';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [LibsServerGraphqlSubgraphAuthModule],
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: {
          federation: 2,
        },
        buildSchemaOptions: {
          orphanedTypes: [Me],
        },
        context: authService.handleAuth.bind(authService),
      }),
      inject: [AuthService],
    }),
    forwardRef(() => SpaceModule),
  ],
  providers: [MeResolver, SpaceResolver],
})
export class GraphqlModule {}
