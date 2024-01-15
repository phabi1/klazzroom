import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
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
  profile: any;

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private keycloakService: KeycloakService
  ) {
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

  async ngOnInit(): Promise<void> {
    this.sidebarService.attachRouter(this.router);

    if (await this.keycloakService.isLoggedIn()) {
      this.profile = await this.keycloakService.loadUserProfile();
    }
  }

  ngOnDestroy(): void {
    this.sidebarService.detachRouter();
    this.sidebarSubscription.unsubscribe();
  }

  logout() {
    this.keycloakService.logout();
  }
}
