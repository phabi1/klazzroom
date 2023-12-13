import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'klazzroom-client-space-dashboard-widgets-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-space-dashboard-widgets-welcome.component.html',
  styleUrls: ['./client-space-dashboard-widgets-welcome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPortalSpaceDashboardWidgetsWelcomeWidgetComponent implements OnInit {
  name = '';

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const profile = await this.keycloakService.loadUserProfile();
    if (profile && profile.firstName) {
      this.name = profile.firstName;
    } else {
      this.name = 'Guest';
    }
    this.changeDetectorRef.detectChanges();
  }
}
