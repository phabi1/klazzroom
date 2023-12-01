import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClientCommonUiLayoutModule } from '@klazzroom/client-common-ui-layout';
import { ClientPortalSidebarTeacherModule } from '@klazzroom/client-portal-sidebar-teacher';
import { ClientPortalStoresSpacesModule } from '@klazzroom/client-portal-stores-spaces';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { GraphQLModule } from './graphql.module';
import initializeKeycloak from './initializers/keycloak.initializer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClientCommonUiLayoutModule,
    ClientPortalSidebarTeacherModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    ClientPortalStoresSpacesModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    GraphQLModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
