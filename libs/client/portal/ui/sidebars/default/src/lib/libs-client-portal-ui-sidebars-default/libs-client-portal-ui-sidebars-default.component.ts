import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LibsClientCommonUiNavigationComponent } from '@klazzroom/libs-client-common-ui-navigation';
import { SidebarTypeDirective } from '@klazzroom/libs-client-portal-ui-layout';

@Component({
  selector: 'lib-libs-client-portal-ui-sidebars-default',
  standalone: true,
  imports: [CommonModule, LibsClientCommonUiNavigationComponent],
  templateUrl: './libs-client-portal-ui-sidebars-default.component.html',
  styleUrl: './libs-client-portal-ui-sidebars-default.component.css',
})
export class LibsClientPortalUiSidebarsDefaultComponent extends SidebarTypeDirective {
  public readonly links = signal<any[]>([]);

  constructor() {
    super();
  }
}
