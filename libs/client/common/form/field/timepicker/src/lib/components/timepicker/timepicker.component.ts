import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'lib-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.css',
})
export class TimepickerComponent extends FieldType<any> {}
