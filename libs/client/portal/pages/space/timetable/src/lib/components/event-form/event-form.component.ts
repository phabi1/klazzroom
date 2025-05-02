import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormlyModule } from '@ngx-formly/core';

export type EventFormData = {
  title: string;
  start: Date;
  end: Date;
};

@Component({
  selector: 'lib-client-portal-pages-space-timetable-event-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, FormlyModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent implements OnInit {
  private readonly data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({});
  model: EventFormData = {
    title: '',
    start: new Date(),
    end: new Date(),
  };
  fields = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Title',
        required: true,
      },
    },
    {
      key: 'start',
      type: 'input',
      props: {
        label: 'Start Date',
        type: 'datetime-local',
        required: true,
      },
    },
    {
      key: 'end',
      type: 'input',
      props: {
        label: 'End Date',
        type: 'datetime-local',
        required: true,
      },
    },
  ];

  ngOnInit(): void {
    if (this.data.event) {
      this.model = { ...this.data.event };
    } else {
      this.model = {
        title: '',
        start: new Date(),
        end: new Date(),
      };
    }
  }
}
