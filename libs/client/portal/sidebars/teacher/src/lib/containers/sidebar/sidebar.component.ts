import { Component } from '@angular/core';
import { NavLink } from '@klazzroom/client-common-ui-navbar';
import { SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'klazzroom-portal-sidebars-teacher-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  currentSpace$ = this.store.select(SpaceSelectors.selectCurrentSpace);

  links$ = this.store
    .select(SpaceSelectors.selectCurrentSpaceId)
    .pipe(
      switchMap((space) =>
        this.navigationService
          .getLinks()
          .pipe(map((links) => this.injectSpaceToLinks(space, links)))
      )
    );

  constructor(
    private store: Store,
    private navigationService: NavigationService
  ) {}

  private injectSpaceToLinks(
    space: string | null,
    links: NavLink[]
  ): NavLink[] {
    return links.map((link) => {
      let children: NavLink[] = [];
      if (link.children && link.children.length > 0) {
        children = this.injectSpaceToLinks(space, link.children);
      }
      return {
        ...link,
        to: (link.to || '').replace(':space', space || ''),
        children,
      };
    });
  }
}
