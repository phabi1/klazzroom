import { Component, inject } from '@angular/core';
import { SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'klazzroom-portal-sidebars-space-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  protected store = inject(Store);
  currentSpace$ = this.store.select(SpaceSelectors.selectCurrentSpace);
}
