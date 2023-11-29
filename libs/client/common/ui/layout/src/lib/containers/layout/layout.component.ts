import { Component, Type } from '@angular/core';
import { SidebarComponent } from '@klazzroom/client-portal-sidebar-teacher';

@Component({
  selector: 'klazzroom-client-common-ui-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  sidebarType: Type<any> = SidebarComponent;
}
