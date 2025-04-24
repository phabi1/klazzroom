import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidgetTypeDirective } from '@klazzroom/libs-client-portal-pages-space-dashboard';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'lib-libs-client-portal-dashboard-widgets-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libs-client-portal-dashboard-widgets-welcome.component.html',
  styleUrl: './libs-client-portal-dashboard-widgets-welcome.component.css',
})
export class LibsClientPortalDashboardWidgetsWelcomeComponent extends DashboardWidgetTypeDirective {
  private readonly keycloakService = inject(KeycloakService);
  name = signal<string>('');

  async ngOnInit() {
    if (!this.keycloakService.isLoggedIn()) {
      return;
    }
    const profile = await this.keycloakService.loadUserProfile();
    const name = profile.preferedname || profile.username || '';
    this.name.set(name);
  }
}
