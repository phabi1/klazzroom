import { ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Me } from './types/me.type';
import { MeResolver } from './resolvers/me.resolver';
import { AdministratorResolver } from './resolvers/space/administrator.resolver';
import { TeacherResolver } from './resolvers/space/teacher.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        orphanedTypes: [Me],
      },
    }),
  ],
  providers: [MeResolver, AdministratorResolver, TeacherResolver],
})
export class GraphqlModule {}
