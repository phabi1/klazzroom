import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { WidgetComponent } from './components/widget/widget.component';
import { PageComponent } from './containers/page/page.component';
import { dashboardRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    GridsterComponent,
    GridsterItemComponent,
    RouterModule.forChild(dashboardRoutes),
  ],
  declarations: [PageComponent, WidgetComponent],
})
export class ClientPortalPagesDashboardModule {}
