import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import {
  CONFIG_LOADER,
  ConfigService,
  HttpConfigLoader,
  provideConfig,
} from '@klazzroom/libs-client-common-services-config-core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { appRoutes } from './app.routes';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideConfig({
      provide: CONFIG_LOADER,
      useFactory: (httpClient: HttpClient) => {
        return new HttpConfigLoader(httpClient, '/config.json');
      },
      deps: [HttpClient],
    }),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const configService = inject(ConfigService);
      const keycloakService = inject(KeycloakService);

      const auth = setContext(async () => {
        const token = await keycloakService.getToken();
        if (!token) {
          return {};
        }
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      return {
        link: ApolloLink.from([
          auth,
          httpLink.create({
            uri:
              configService.getSetting<string>('graphql.endpoint') ||
              '/graphql',
          }),
        ]),
        cache: new InMemoryCache(),
      };
    }),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: (
        configService: ConfigService,
        keycloakService: KeycloakService
      ) => {
        return async () => {
          await configService.load();
          return keycloakService.init({
            config: {
              realm: configService.getSetting<string>('keycloak.realm'),
              url: configService.getSetting<string>('keycloak.url'),
              clientId: configService.getSetting<string>('keycloak.clientId'),
            },
            initOptions: {
              onLoad: 'check-sso',
              silentCheckSsoRedirectUri:
                window.location.origin + '/silent-check-sso.html',
            },
          });
        };
      },
      deps: [ConfigService, KeycloakService],
      multi: true,
    },
    importProvidersFrom(FormlyModule.forRoot()),
    importProvidersFrom(FormlyMaterialModule),
    provideAnimationsAsync(),
  ],
};
