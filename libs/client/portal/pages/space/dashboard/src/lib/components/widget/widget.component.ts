import { Component, Input } from '@angular/core';
import { ClientPortalSpaceDashboardWidgetsBirthdaysWidgetComponent } from '@klazzroom/client-portal-space-dashboard-widgets-birthdays';
import { ClientPortalSpaceDashboardWidgetsClockWidgetComponent } from '@klazzroom/client-portal-space-dashboard-widgets-clock';
import { ClientPortalSpaceDashboardWidgetsStudentsWidgetComponent } from '@klazzroom/client-portal-space-dashboard-widgets-students';
import { ClientPortalSpaceDashboardWidgetsWelcomeWidgetComponent } from '@klazzroom/client-portal-space-dashboard-widgets-welcome';
import { Widget } from '../../interfaces/widget.interface';

@Component({
  selector: 'klazzroom-dashboard-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent {
  @Input() widget!: Widget;

  get componentType() {
    if (this.widget.type === 'welcome') {
      return ClientPortalSpaceDashboardWidgetsWelcomeWidgetComponent;
    } else if (this.widget.type === 'clock') {
      return ClientPortalSpaceDashboardWidgetsClockWidgetComponent;
    } else if (this.widget.type === 'students') {
      return ClientPortalSpaceDashboardWidgetsStudentsWidgetComponent;
    } else if (this.widget.type === 'birthdays') {
      return ClientPortalSpaceDashboardWidgetsBirthdaysWidgetComponent;
    } else {
      return null;
    }
  }
}
