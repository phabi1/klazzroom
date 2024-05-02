import { CommonModule } from '@angular/common';
import { NgModule, forwardRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientCommonUiNavbarModule } from '@klazzroom/client-common-ui-navbar';
import { ClientPortalStoresNavigationModule } from '@klazzroom/client-portal-stores-navigation';
import { SidebarComponent } from './containers/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClientCommonUiNavbarModule,
    forwardRef(() => ClientPortalStoresNavigationModule),
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class ClientPortalSidebarAdminModule {}
