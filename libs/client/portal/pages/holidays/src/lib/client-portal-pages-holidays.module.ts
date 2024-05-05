import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormComponent } from './containers/form/form.component';
import { ListComponent } from './containers/list/list.component';
import { clientPortalPagesHolidaysRoutes } from './lib.routes';
import { HolidayZonePipe } from './pipes/holiday-zone.pipe';
import { HolidayService } from './services/holiday.service';

@NgModule({
  imports: [
    CommonModule,
    FormlyModule,
    FormlyMaterialModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    RouterModule.forChild(clientPortalPagesHolidaysRoutes),
  ],
  declarations: [ListComponent, FormComponent, HolidayZonePipe],
  providers: [HolidayService],
})
export class ClientPortalPagesHolidaysModule {}
