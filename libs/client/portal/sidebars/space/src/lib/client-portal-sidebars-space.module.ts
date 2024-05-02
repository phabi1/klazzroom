import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { ClientPortalSidebarAdminModule } from '@klazzroom/client-portal-sidebar-admin';
import { ClientPortalSidebarTeacherModule } from '@klazzroom/client-portal-sidebar-teacher';

@NgModule({
  imports: [
    CommonModule,
    ClientPortalSidebarAdminModule,
    ClientPortalSidebarTeacherModule,
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class ClientPortalSidebarsSpaceModule {}
