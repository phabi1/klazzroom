import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { ConfigService } from '@klazzroom/client-common-config-core';

export function createApollo(
  httpLink: HttpLink,
  confgService: ConfigService
): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri: confgService.getSettings('api.endpoint'),
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
