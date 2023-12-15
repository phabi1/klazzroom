/// <reference types="@angular/localize" />
import { Injectable } from '@angular/core';
import { Holiday } from '../models/holiday.model';
import { PdfGenerator } from './generators/pdf';

@Injectable()
export class FriezeDaysService {
  getMonthOptions() {
    return [
      {
        label: $localize`:@@commons.date.months.january:January`,
        value: 0,
      },
      {
        label: $localize`:@@commons.date.months.february:February`,
        value: 1,
      },
      {
        label: $localize`:@@commons.date.months.march:March`,
        value: 2,
      },
      {
        label: $localize`:@@commons.date.months.april:April`,
        value: 3,
      },
      { label: $localize`:@@commons.date.months.may:May`, value: 4 },
      { label: $localize`:@@commons.date.months.june:June`, value: 5 },
      { label: $localize`:@@commons.date.months.july:July`, value: 6 },
      {
        label: $localize`:@@commons.date.months.august:August`,
        value: 7,
      },
      {
        label: $localize`:@@commons.date.months.september:September`,
        value: 8,
      },
      {
        label: $localize`:@@commons.date.months.october:October`,
        value: 9,
      },
      {
        label: $localize`:@@commons.date.months.november:November`,
        value: 10,
      },
      {
        label: $localize`:@@commons.date.months.december:December`,
        value: 11,
      },
    ];
  }

  generatePDF(month: number, year: number, options?: { holidays?: Holiday[] }) {
    const generator = new PdfGenerator();
    if (options) {
      if (options.holidays) {
        generator.holidays = options.holidays;
      }
    }
    generator.generate(month, year);
  }
}
