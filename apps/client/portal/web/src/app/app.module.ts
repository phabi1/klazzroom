import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InMemoryCache } from '@apollo/client/cache';
import { AssetService } from '@klazzroom/client-common-asset';
import {
  CONFIG_LOADER,
  ClientCommonConfigModule,
  ConfigService,
} from '@klazzroom/client-common-config-core';
import { ClientCommonUiLayoutModule } from '@klazzroom/client-common-ui-layout';
import {
  ClientPortalSidebarsSpaceModule,
  SidebarComponent,
} from '@klazzroom/client-portal-sidebars-space';
import { ClientPortalStoresSpacesModule } from '@klazzroom/client-portal-stores-spaces';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { createAssetService } from './factories/asset-service.factory';
import { createConfigLoader } from './factories/config-loader.factory';
import initializeConfig from './initializers/config.initializer';
import initializeKeycloak from './initializers/keycloak.initializer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    ClientCommonConfigModule.forRoot({
      loader: {
        provide: CONFIG_LOADER,
        useFactory: createConfigLoader,
        deps: [HttpClient, AssetService],
      },
    }),
    KeycloakAngularModule,
    ClientCommonUiLayoutModule.forRoot({
      sidebars: [
        {
          name: 'space',
          component: SidebarComponent,
        },
      ],
    }),
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    ClientPortalStoresSpacesModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    ClientPortalSidebarsSpaceModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      multi: true,
      deps: [ConfigService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, ConfigService, AssetService],
    },
    {
      provide: AssetService,
      useFactory: createAssetService,
      deps: [LOCALE_ID],
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.api.endpoint,
          }),
        };
      },
      deps: [HttpLink, ConfigService],
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
