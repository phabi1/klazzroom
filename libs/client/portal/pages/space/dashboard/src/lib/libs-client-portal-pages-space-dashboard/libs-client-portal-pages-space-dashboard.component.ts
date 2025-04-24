import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibsClientCommonUiPageComponent } from '@klazzroom/libs-client-common-ui-page';

@Component({
  selector: 'lib-libs-client-portal-pages-space-dashboard',
  standalone: true,
  imports: [CommonModule, LibsClientCommonUiPageComponent],
  templateUrl: './libs-client-portal-pages-space-dashboard.component.html',
  styleUrl: './libs-client-portal-pages-space-dashboard.component.css',
})
export class LibsClientPortalPagesSpaceDashboardComponent {}
