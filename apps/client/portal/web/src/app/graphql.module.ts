import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { ConfigService } from '@klazzroom/client-common-config-core';
import { environment } from '../environments/environment';

export function createApollo(
  httpLink: HttpLink,
): ApolloClientOptions<any> {
  const uri = environment.api.endpoint;
  return {
    link: httpLink.create({
      uri
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
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
