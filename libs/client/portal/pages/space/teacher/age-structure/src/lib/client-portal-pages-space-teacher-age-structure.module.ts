import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientPortalStoresSpaceTeacherAgeStructureModule } from '@klazzroom/client-portal-stores-space-teacher-age-structure';
import { ChartComponent } from './components/chart/chart.component';
import { PageComponent } from './containers/page/page.component';
import { clientPortalPagesSpaceTeacherAgeStructureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    ClientPortalStoresSpaceTeacherAgeStructureModule,
    RouterModule.forChild(clientPortalPagesSpaceTeacherAgeStructureRoutes),
  ],
  declarations: [PageComponent, ChartComponent],
})
export class ClientPortalPagesSpaceTeacherAgeStructureModule {}
