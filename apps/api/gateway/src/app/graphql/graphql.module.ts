import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services/auth/auth.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      imports: [AuthModule],
      driver: ApolloGatewayDriver,
      useFactory: (authService: AuthService): ApolloGatewayDriverConfig => ({
        server: {
          context: authService.handleAuth.bind(authService),
          playground: true,
        },
        gateway: {
          buildService: ({ url }) => {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }: any) {
                request.http.headers.set('user', context.userId);
                request.http.headers.set(
                  'authorization',
                  context.authorization
                );
              },
            });
          },
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              { name: 'spaces', url: 'http://space-server:3000/graphql' },
              { name: 'courses', url: 'http://course-server:3000/graphql' },
              {
                name: 'timetables',
                url: 'http://timetable-server:3000/graphql',
              },
            ],
          }),
        },
      }),
      inject: [AuthService],
    }),
  ],
})
export class GraphqlModule {}
