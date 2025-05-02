import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import {
  AuthService,
  LibsServerGraphqlGatewayAuthModule,
} from '@klazzroom/libs-server-graphql-gateway-auth';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { readFile } from 'fs/promises';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [LibsServerGraphqlGatewayAuthModule],
      useFactory: async (
        configService: ConfigService,
        authService: AuthService
      ) => {
        const content = await readFile(
          configService.get<string>('app.directory') + '/graphql.json',
          'utf-8'
        );
        const config = JSON.parse(content);

        return {
          server: {
            context: authService.handle.bind(authService),
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: config.subgraphs,
            }),
            buildService: ({ url }) => {
              return new RemoteGraphQLDataSource({
                url,
                willSendRequest({ request, context }) {
                  if (context.token) {
                    request.http?.headers.set('Authorization', context.token);
                  }
                  if (context.userId) {
                    request.http?.headers.set('x-user-id', context.userId);
                  }
                },
              });
            },
          },
        };
      },
      inject: [ConfigService, AuthService],
    }),
  ],
})
export class GraphqlModule {}
