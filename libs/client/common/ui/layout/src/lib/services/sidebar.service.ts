import { Inject, Injectable, Type } from '@angular/core';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { BehaviorSubject, Subscription, filter, map, startWith } from 'rxjs';
import { LAYOUT_SIDEBARS } from '../constants/tokens';

@Injectable()
export class SidebarService {

  private routerSubscription!: Subscription;
  sidebar$ = new BehaviorSubject<string>('');

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(LAYOUT_SIDEBARS)
    private sidebars: { name: string; component: Type<any> }[],
    private route: ActivatedRoute
  ) {}

  public attachRouter(router: Router): void {
    this.routerSubscription = router.events
      .pipe(
        startWith({ type: EventType.NavigationEnd }),
        filter(
          (event) =>
            event.type === EventType.NavigationEnd ||
            event.type === EventType.NavigationCancel
        ),
        map(() => {
          let sidebar = '';
          let currentRoute: ActivatedRoute = this.route.root;
          while (currentRoute) {
            if (currentRoute.snapshot?.data['sidebar']) {
              sidebar = currentRoute.snapshot?.data['sidebar'];
            }
            if (currentRoute.firstChild) {
              currentRoute = currentRoute.firstChild;
            } else {
              break;
            }
          }
          return sidebar;
        })
      )
      .subscribe((sidebar) => {
        this.sidebar$.next(sidebar);
      });
  }

  public detachRouter(): void {
    this.routerSubscription.unsubscribe();
  }

  public resolveSidebar(sidebar: string): Type<any> {
    const resolvedSidebar = this.sidebars.find((s) => s.name === sidebar);
    if (!resolvedSidebar) {
      throw new Error(`Sidebar ${sidebar} not found`);
    }
    return resolvedSidebar.component;
  }
}
