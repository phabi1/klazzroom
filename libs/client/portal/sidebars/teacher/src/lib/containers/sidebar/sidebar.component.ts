import { Component, OnInit } from '@angular/core';
import { SpaceSelectors } from '@klazzroom/client-common-stores-spaces';
import { NavLink } from '@klazzroom/client-common-ui-navbar';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'klazzroom-portal-sidebars-teacher-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentSpace$ = this.store.select(SpaceSelectors.selectCurrentSpace);
  links: NavLink[] = [];

  constructor(
    private store: Store,
    private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.getLinks()
    .pipe(
      withLatestFrom(this.store.select(SpaceSelectors.selectCurrentSpaceId)),
      map(([links, space]) => this.injectSpaceToLinks(space, links))
    )
    .subscribe((links) => {
      this.links = links;
    });
  }

  private injectSpaceToLinks(space: string | null, links: NavLink[]): NavLink[] {
    return links.map((link) => {
      let children: NavLink[] = [];
      if (link.children && link.children.length > 0) {
        children = this.injectSpaceToLinks(space, link.children);
      }
      return {
        ...link,
        to: (link.to || '').replace(':space', space || ''),
        children
      };
    });
  }
}
