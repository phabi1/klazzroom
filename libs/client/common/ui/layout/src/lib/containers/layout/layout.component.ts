import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'klazzroom-client-common-ui-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private sidebarSubscription!: Subscription;
  sidebarType: Type<any> | null = null;

  constructor(private router: Router, private sidebarService: SidebarService) {
    this.sidebarSubscription = this.sidebarService.sidebar$.subscribe(
      (sidebar) => {
        if (sidebar) {
          this.sidebarType = this.sidebarService.resolveSidebar(sidebar);
        } else {
          this.sidebarType = null;
        }
      }
    );
  }

  ngOnInit(): void {
    this.sidebarService.attachRouter(this.router);
  }

  ngOnDestroy(): void {
    this.sidebarService.detachRouter();
    this.sidebarSubscription.unsubscribe();
  }
}
