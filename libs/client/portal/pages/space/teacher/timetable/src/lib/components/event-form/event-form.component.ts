import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TimetableEvent } from '../../models/timetable-event.model';

export interface EventFormModel {
  start: string;
  end: string;
  title: string;
  meta: {
    type: string;
    grades: string[];
  };
}

@Component({
  selector: 'klazzroom-portal-space-teacker-timetable-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  form = new FormGroup({});
  model: EventFormModel = {
    start: '',
    end: '',
    title: '',
    meta: {
      type: 'LESSON',
      grades: [],
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Title',
      },
    },
    {
      fieldGroupClassName: 'flex gap-4',
      fieldGroup: [
        {
          key: 'start',
          type: 'input',
          props: {
            type: 'time',
            label: 'Start',
            required: true,
          },
          className: 'flex-1',
        },
        {
          key: 'end',
          type: 'input',
          props: {
            type: 'time',
            label: 'End',
            required: true,
          },
          className: 'flex-1',
        },
      ],
    },
    {
      key: 'meta.type',
      type: 'radio',
      props: {
        label: 'Type',
        required: true,
        options: [
          {
            label: 'Activity',
            value: 'LESSON',
          },
          {
            label: 'Rituel',
            value: 'RITUEL',
          },
          {
            label: 'Pause',
            value: 'PAUSE',
          },
        ],
      },
    },
    {
      key: 'meta.lesson',
      type: 'select',
      expressions: {
        hide: (field) => {
          return field.model['meta']['type'] !== 'LESSON';
        }
      },
      props: {
        label: 'Lesson',
        required: false,
        options: [
          {
            label: 'Maths',
            value: 'MATHS',
          },
          {
            label: 'Français',
            value: 'FRANCAIS',
          },
          {
            label: 'Anglais',
            value: 'ANGLAIS',
          },
          {
            label: 'Histoire',
            value: 'HISTOIRE',
          },
          {
            label: 'Géographie',
            value: 'GEOGRAPHIE',
          },
          {
            label: 'Sciences',
            value: 'SCIENCES',
          },
          {
            label: 'Arts',
            value: 'ARTS',
          },
          {
            label: 'Sport',
            value: 'SPORT',
          },
          {
            label: 'Musique',
            value: 'MUSIQUE',
          },
          {
            label: 'Poésie',
            value: 'POESIE',
          },
          {
            label: 'Rituel',
            value: 'RITUEL',
          },
          {
            label: 'Pause',
            value: 'PAUSE',
          },
        ],
      },
    },
    {
      key: 'meta.grades',
      type: 'select',
      props: {
        label: 'Grades',
        required: true,
        multiple: true,
        options: [
          {
            label: 'CP',
            value: 'CP',
          },
          {
            label: 'CE1',
            value: 'CE1',
          },
          {
            label: 'CE2',
            value: 'CE2',
          },
          {
            label: 'CM1',
            value: 'CM1',
          },
          {
            label: 'CM2',
            value: 'CM2',
          },
        ],
      },
    },
  ];

  constructor(
    private dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { event: TimetableEvent }
  ) {}

  ngOnInit(): void {
    this.model = {
      ...this.data.event,
      start: this.convertTime(this.data.event.start),
      end: this.data.event.end ? this.convertTime(this.data.event.end) : '',
      meta: {
        ...(this.data.event.meta || { type: 'LESSON', grades: [] }),
      },
    };
  }

  submit() {
    const event: TimetableEvent = {
      ...this.data.event,
      ...this.model,
      start: this.convertDate(this.model.start, this.data.event.start),
      end: this.convertDate(this.model.end, this.data.event.end),
      meta: {
        ...this.data.event.meta,
        ...this.model.meta,
      },
    };
    this.dialogRef.close(event);
  }

  convertTime(start: Date): string {
    const hours =
      start.getHours() > 9 ? start.getHours() : `0${start.getHours()}`;
    const minutes =
      start.getMinutes() > 9 ? start.getMinutes() : `0${start.getMinutes()}`;
    return `${hours}:${minutes}`;
  }

  convertDate(time: string, f?: Date): Date {
    if (!f) {
      f = new Date();
    }
    const [hours, minutes] = time.split(':');
    const d = new Date();
    d.setHours(+hours);
    d.setMinutes(+minutes);
    return d;
  }
}
