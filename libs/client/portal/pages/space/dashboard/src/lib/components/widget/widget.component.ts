import { Component, Input } from '@angular/core';
import { ClientSpaceDashboardWidgetsStudentsWidgetComponent } from '@klazzroom/client-space-dashboard-widgets-students';
import { ClientSpaceDashboardWidgetsWelcomeComponent } from '@klazzroom/client-space-dashboard-widgets-welcome';
import { SpaceDashboardWidgetsClockWidgetComponent } from '@klazzroom/clock';
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
      return ClientSpaceDashboardWidgetsWelcomeComponent;
    } else if (this.widget.type === 'clock') {
      return SpaceDashboardWidgetsClockWidgetComponent;
    } else if (this.widget.type === 'students') {
      return ClientSpaceDashboardWidgetsStudentsWidgetComponent;
    } else {
      return null;
    }
  }
}
