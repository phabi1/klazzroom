import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientCommonUiNavbarModule } from '@klazzroom/client-common-ui-navbar';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { NavigationService } from './services/navigation.service';

@NgModule({
  imports: [CommonModule, RouterModule, ClientCommonUiNavbarModule],
  declarations: [SidebarComponent],
  providers: [NavigationService],
  exports: [SidebarComponent],
})
export class ClientPortalSidebarTeacherModule {}
