import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ClientCommonFormFieldTimepickerModule } from '@klazzroom/client-common-form-field-timepicker';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventFormComponent } from './components/event-form/event-form.component';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { FormComponent } from './containers/form/form.component';
import { ListComponent } from './containers/list/list.component';
import { PageComponent } from './containers/page/page.component';
import { clientSpaceTeacherTimetableRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormlyModule.forChild(),
    FormlyMaterialModule,
    ClientCommonFormFieldTimepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    RouterModule.forChild(clientSpaceTeacherTimetableRoutes),
  ],
  declarations: [
    PageComponent,
    EventFormComponent,
    ListComponent,
    FormComponent,
    SettingsFormComponent,
  ],
})
export class ClientSpaceTeacherTimetableModule {}
