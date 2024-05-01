import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { ClientPortalStoresNavigationModule } from '@klazzroom/client-portal-stores-navigation';

@NgModule({
  imports: [CommonModule, forwardRef(() => ClientPortalStoresNavigationModule)],
  declarations: [SidebarComponent],
})
export class ClientPortalSidebarAdminModule {}
