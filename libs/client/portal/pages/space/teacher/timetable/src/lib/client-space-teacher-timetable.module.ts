import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventFormComponent } from './components/event-form/event-form.component';
import { PageComponent } from './containers/page/page.component';
import { clientSpaceTeacherTimetableRoutes } from './lib.routes';
import { ClientPortalStoresSpaceTeacherTimetableModule } from '@klazzroom/client-portal-stores-space-teacher-timetable';
import { ListComponent } from './containers/list/list.component';
import { AddFormComponent } from './components/add-form/add-form.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormlyModule.forChild(),
    FormlyMaterialModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild(clientSpaceTeacherTimetableRoutes),
    ClientPortalStoresSpaceTeacherTimetableModule,
  ],
  declarations: [
    PageComponent,
    EventFormComponent,
    ListComponent,
    AddFormComponent,
  ],
})
export class ClientSpaceTeacherTimetableModule {}
