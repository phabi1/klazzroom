import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'lib-libs-client-common-form-field-timepicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libs-client-common-form-field-timepicker.component.html',
  styleUrl: './libs-client-common-form-field-timepicker.component.css',
})
export class LibsClientCommonFormFieldTimepickerComponent extends FieldType {}
