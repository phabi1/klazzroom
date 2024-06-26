import { Component, Inject, LOCALE_ID } from '@angular/core';
import { NavLink } from '@klazzroom/client-common-ui-navbar';
import {
  INavLink,
  NavigationService,
} from '@klazzroom/client-portal-stores-navigation';
import { SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'klazzroom-portal-sidebars-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  currentSpace$ = this.store.select(SpaceSelectors.selectCurrentSpace);

  links$ = this.store.select(SpaceSelectors.selectCurrentSpaceId).pipe(
    switchMap((space) =>
      this.navigationService.getLinks('admin').pipe(
        map((links) => this.translateLinks(links)),
        map((links) => this.injectSpaceToLinks(space, links))
      )
    )
  );

  constructor(
    @Inject(LOCALE_ID) public localeId: string,
    private store: Store,
    private navigationService: NavigationService
  ) {}

  private translateLinks(links: INavLink[]): NavLink[] {
    return links.map((link) => {
      let children: NavLink[] = [];
      if (link.children && link.children.length > 0) {
        children = this.translateLinks(link.children);
      }
      return {
        ...link,
        title:
          typeof link.title === 'object'
            ? link.title[this.localeId] || link.title['en']
            : link.title,
        children,
      };
    });
  }

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
