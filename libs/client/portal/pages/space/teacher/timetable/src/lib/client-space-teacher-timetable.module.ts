import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'angular-calendar';
import { PageComponent } from './containers/page/page.component';
import { clientSpaceTeacherTimetableRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    RouterModule.forChild(clientSpaceTeacherTimetableRoutes),
  ],
  declarations: [PageComponent],
})
export class ClientSpaceTeacherTimetableModule {}
