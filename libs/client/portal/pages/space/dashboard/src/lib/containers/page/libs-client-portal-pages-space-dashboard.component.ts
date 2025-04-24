import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  GridsterComponent,
  GridsterConfig,
  GridsterItemComponent,
  GridType,
} from 'angular-gridster2';
import { WidgetOutletComponent } from '../../components/widget-outlet/widget-outlet.component';
import { DashboardWidgetType } from '../../models/dashboard-widget-type.model';
import { DashboardWidgetRegistryService } from '../../services/dashboard-widget-registry.service';

@Component({
  selector: 'lib-libs-client-portal-pages-space-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    GridsterComponent,
    GridsterItemComponent,
    WidgetOutletComponent,
  ],
  templateUrl: './libs-client-portal-pages-space-dashboard.component.html',
  styleUrl: './libs-client-portal-pages-space-dashboard.component.css',
})
export class LibsClientPortalPagesSpaceDashboardComponent {
  options = signal<GridsterConfig>({
    gridType: GridType.VerticalFixed,
    fixedRowHeight: 100,
    maxCols: 12,
  });
  dashboard = signal<DashboardWidgetType[]>([
    {
      x: 0,
      y: 0,
      cols: 12,
      rows: 1,
      type: 'welcome',
    },
    {
      x: 0,
      y: 1,
      cols: 6,
      rows: 1,
      type: 'clock',
    },
    {
      x: 6,
      y: 1,
      cols: 6,
      rows: 1,
      type: 'students',
    },
  ]);
}
