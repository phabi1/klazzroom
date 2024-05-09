import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'klazzroom-portal-space-teacker-timetable-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SettingsFormComponent {
  form = new FormGroup({});
  model = {
    days: [],
    timeStart: '',
    timeEnd: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'days',
      type: 'multicheckbox',
      props: {
        label: 'Days',
        multiple: true,
        options: [
          {
            value: 'monday',
            label: $localize`@@commons.date.days.monday:Monday`,
          },
        ],
      },
    },
    {
      fieldGroupClassName: 'flex gap-3',
      fieldGroup: [
        {
          key: 'timeStart',
          type: 'timepicker',
          props: {
            label: 'Time start',
            required: true,
          },
          className: 'flex-1',
        },
        {
          key: 'timeEnd',
          type: 'timepicker',
          props: {
            label: 'Time end',
            required: true,
          },
          className: 'flex-1',
        },
      ],
    },
  ];
}
