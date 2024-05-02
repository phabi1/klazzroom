import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { ConfigService } from '@klazzroom/client-common-config-core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

export function createApollo(
  httpLink: HttpLink,
  configService: ConfigService
): ApolloClientOptions<any> {
  const uri = configService.getSettings<string>(
    'api.endpoint',
    'https://api.klazzroom.fr/graphql'
  );
  return {
    link: httpLink.create({
      uri: uri,
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ConfigService],
    },
  ],
})
export class GraphQLModule {}
