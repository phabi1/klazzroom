/// <reference types="@angular/localize" />
import { Injectable } from '@angular/core';
import { Holiday } from '../models/holiday.model';
import { PdfGenerator } from './generators/pdf';

@Injectable()
export class FriezeDaysService {
  getMonthOptions() {
    return [
      {
        label: $localize`:@@common.date.months.january:January`,
        value: 0,
      },
      {
        label: $localize`:@@common.date.months.january:February`,
        value: 1,
      },
      {
        label: $localize`:@@common.date.months.january:March`,
        value: 2,
      },
      {
        label: $localize`:@@common.date.months.january:April`,
        value: 3,
      },
      { label: $localize`:@@common.date.months.january:May`, value: 4 },
      { label: $localize`:@@common.date.months.january:June`, value: 5 },
      { label: $localize`:@@common.date.months.january:July`, value: 6 },
      {
        label: $localize`:@@common.date.months.january:August`,
        value: 7,
      },
      {
        label: $localize`:@@common.date.months.january:September`,
        value: 8,
      },
      {
        label: $localize`:@@common.date.months.january:October`,
        value: 9,
      },
      {
        label: $localize`:@@common.date.months.january:November`,
        value: 10,
      },
      {
        label: $localize`:@@common.date.months.january:December`,
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
