import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  CONFIG_LOADER,
  ClientCommonConfigModule,
  ConfigService,
} from '@klazzroom/client-common-config-core';
import { ClientCommonUiLayoutModule } from '@klazzroom/client-common-ui-layout';
import { ClientPortalSidebarTeacherModule, SidebarComponent } from '@klazzroom/client-portal-sidebar-teacher';
import { ClientPortalStoresSpacesModule } from '@klazzroom/client-portal-stores-spaces';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { createConfigLoader } from './factories/config-loader.factory';
import { GraphQLModule } from './graphql/graphql.module';
import initializeKeycloak from './initializers/keycloak.initializer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClientCommonConfigModule.forRoot({
      loader: {
        provide: CONFIG_LOADER,
        useFactory: createConfigLoader,
        deps: [HttpClient],
      },
    }),
    KeycloakAngularModule,
    ClientCommonUiLayoutModule.forRoot({sidebars: [
      {
        name: 'space',
        component: SidebarComponent,
      },
    ]}),
    ClientPortalSidebarTeacherModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    ClientPortalStoresSpacesModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    GraphQLModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, ConfigService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
