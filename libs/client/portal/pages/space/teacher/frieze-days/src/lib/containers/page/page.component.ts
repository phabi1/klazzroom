import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FriezeDaysService } from '../../services/frieze-days.service';
import { Holiday } from '../../models/holiday.model';

@Component({
  selector: 'klazzroom-portal-space-teacher-frieze-days-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  form = new FormGroup({});
  model: { month?: number; year?: number } = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-1 gap-4',
      fieldGroup: [
        {
          key: 'month',
          type: 'select',
          props: {
            label: 'Month',
            options: this.friezeDaysService.getMonthOptions(),
            required: true,
          },
          className: 'flex-1',
        },
        {
          key: 'year',
          type: 'input',
          props: {
            label: 'Year',
            type: 'number',
            required: true,
          },
          className: 'flex-1',
        },
      ],
    },
  ];

  constructor(private friezeDaysService: FriezeDaysService) {}

  ngOnInit(): void {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1);
    this.model = {
      month: nextMonth.getMonth(),
      year: nextMonth.getFullYear(),
    };
  }

  generate() {
    if (this.form.valid) {
      this.friezeDaysService.generatePDF(
        this.model.month || 0,
        this.model.year || 0,
        {
          holidays: [new Holiday(new Date(2023, 11, 22), new Date(2024, 0, 8))],
        }
      );
    }
  }
}
