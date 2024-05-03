import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services/auth/auth.service';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      imports: [AuthModule],
      driver: ApolloGatewayDriver,
      useFactory: async (
        authService: AuthService
      ): Promise<ApolloGatewayDriverConfig> => {
        const config = JSON.parse(
          await readFile(join(__dirname, 'assets', 'config.json'), 'utf-8')
        );

        const services = config.services;
        return {
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
              subgraphs: services,
            }),
          },
        };
      },
      inject: [AuthService],
    }),
  ],
})
export class GraphqlModule {}
