import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibsClientCommonUiPageComponent } from '@klazzroom/libs-client-common-ui-page';

@Component({
  selector: 'lib-libs-client-portal-pages-sticky-names',
  standalone: true,
  imports: [CommonModule, RouterLink, LibsClientCommonUiPageComponent],
  templateUrl: './libs-client-portal-pages-sticky-names.component.html',
  styleUrl: './libs-client-portal-pages-sticky-names.component.css',
})
export class LibsClientPortalPagesStickyNamesComponent {}
