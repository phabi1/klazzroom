import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpacesStore } from '@klazzroom/libs-client-portal-stores-space';
import { LibsClientCommonUiPageComponent } from '@klazzroom/libs-client-common-ui-page';

@Component({
  selector: 'lib-libs-client-portal-pages-spaces',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LibsClientCommonUiPageComponent,
  ],
  templateUrl: './libs-client-portal-pages-spaces.component.html',
  styleUrl: './libs-client-portal-pages-spaces.component.css',
})
export class LibsClientPortalPagesSpacesComponent implements OnInit {
  public readonly store = inject(SpacesStore);

  ngOnInit(): void {
    this.store.init();
  }
}
