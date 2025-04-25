import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Action,
  LibsClientCommonUiPageComponent,
} from '@klazzroom/libs-client-common-ui-page';
import { FormlyModule } from '@ngx-formly/core';
import { CalendarDaysService } from '../../services/calendar-days.service';

@Component({
  selector: 'lib-libs-client-portal-pages-calendar-days',
  standalone: true,
  imports: [CommonModule, LibsClientCommonUiPageComponent, FormlyModule],
  templateUrl: './libs-client-portal-pages-calendar-days.component.html',
  styleUrl: './libs-client-portal-pages-calendar-days.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalendarDaysService],
})
export class LibsClientPortalPagesCalendarDaysComponent implements OnInit {

  private readonly calendarDaysService: CalendarDaysService =
    inject(CalendarDaysService);

  form = new FormGroup({});
  model: {
    month: string;
    year: string;
  } = {
    month: '',
    year: '',
  };
  fields = [
    {
      key: 'month',
      type: 'select',
      props: {
        label: 'Month',
        placeholder: 'Select a month',
        options: [
          { label: 'January', value: '1' },
          { label: 'February', value: '2' },
          { label: 'March', value: '3' },
          { label: 'April', value: '4' },
          { label: 'May', value: '5' },
          { label: 'June', value: '6' },
          { label: 'July', value: '7' },
          { label: 'August', value: '8' },
          { label: 'September', value: '9' },
          { label: 'October', value: '10' },
          { label: 'November', value: '11' },
          { label: 'December', value: '12' },
        ],
      },
    },
    {
      key: 'year',
      type: 'input',
      props: {
        label: 'Year',
        placeholder: 'Enter a year',
        type: 'number',
      },
    },
  ];
  actions: Action[] = [
    {
      name: 'generate',
      label: 'Generate',
      handle: () => {
        this.calendarDaysService.generateCalendarDays(
          this.model.month,
          this.model.year
        );
      },
    },
  ];

  ngOnInit(): void {
    const nextDate = this.getNextMonth(new Date()); 
    this.model = {
      month: (nextDate.getMonth() + 1).toString(),
      year: nextDate.getFullYear().toString(),
    }
  }

  protected getNextMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
}
