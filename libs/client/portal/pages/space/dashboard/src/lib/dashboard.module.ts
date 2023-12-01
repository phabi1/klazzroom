import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './lib.routes';
import { PageComponent } from './containers/page/page.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes)],
  declarations: [PageComponent],
})
export class ClientCommonPagesDashboardModule {}
