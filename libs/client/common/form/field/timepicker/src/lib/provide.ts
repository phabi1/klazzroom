import { FormlyModule } from '@ngx-formly/core';
import { LibsClientCommonFormFieldTimepickerComponent } from './libs-client-common-form-field-timepicker/libs-client-common-form-field-timepicker.component';
import { importProvidersFrom } from '@angular/core';

export function provideFormlyFieldTimepicker() {
  return importProvidersFrom(
    FormlyModule.forChild({
      types: [
        {
          name: 'timepicker',
          component: LibsClientCommonFormFieldTimepickerComponent,
          wrappers: ['form-field'],
        },
      ],
    })
  );
}
