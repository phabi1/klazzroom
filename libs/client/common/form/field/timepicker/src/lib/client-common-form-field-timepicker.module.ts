import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    FormlyModule.forChild({
      types: [{ name: 'timepicker', component: TimepickerComponent, wrappers: ['form-field'] }],
    }),
  ],
  declarations: [TimepickerComponent],
})
export class ClientCommonFormFieldTimepickerModule {}
