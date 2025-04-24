import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidgetRegistryService } from '../../services/dashboard-widget-registry.service';

@Component({
  selector: 'lib-libs-client-portal-pages-space-dashboard-widget-outlet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-outlet.component.html',
  styleUrl: './widget-outlet.component.css',
})
export class WidgetOutletComponent {
  private readonly widgetRegistry = inject(DashboardWidgetRegistryService);

  type = input.required<string>();

  cmpType = computed(async () => {
    const cmp = await this.widgetRegistry.get(this.type());
    if (!cmp) {
      throw new Error(`Widget ${this.type} not found`);
    }
    return cmp;
  });
}
