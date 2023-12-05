import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clientPortalPagesSpaceTeacherAgeStructureRoutes } from './lib.routes';
import { PageComponent } from './containers/page/page.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientPortalPagesSpaceTeacherAgeStructureRoutes),
  ],
  declarations: [PageComponent, ChartComponent],
})
export class ClientPortalPagesSpaceTeacherAgeStructureModule {}
