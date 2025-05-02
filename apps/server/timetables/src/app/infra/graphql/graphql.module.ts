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
import { TimetableModule } from '../../domain/timetable/timetable.module';
import { TimetableResolver } from './resolvers/timetable/timetable.resolver';

@Module({
  imports: [
    forwardRef(() => TimetableModule),
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
  ],
  providers: [TimetableResolver],
})
export class GraphqlModule {}
