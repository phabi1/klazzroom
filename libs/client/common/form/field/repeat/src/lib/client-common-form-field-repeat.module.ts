import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { RepeatTypeComponent } from './compoennts/repeat.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormlyModule.forChild({
      types: [{ name: 'repeat', component: RepeatTypeComponent }],
    }),
  ],
  exports: [FormlyModule],
  declarations: [RepeatTypeComponent],
})
export class ClientCommonFormFieldRepeatModule {}
