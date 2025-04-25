import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';

@Injectable()
export class CalendarDaysService {
  generateCalendarDays(month: string, year: string) {
    // Create the PDF document definition
    const docDefinition: any = {
      content: [

        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*'],
            body: this.createCalendarDaysTable(month, year),
          },
        },
      ],
      pageOrientation: 'landscape',
      pageSize: 'A4',
      pageMargins: 10,
      styles: {
        number: {
          fontSize: 30,
          alignment: 'center',
        },
        open: {
          color: '#00ff00',
        },
        close: {
          color: '#ff0000',
        },
        label: {
          fontSize: 20,
          alignment: 'center',
        },
      },
    };

    // Generate the PDF and print it
    pdfMake.createPdf(docDefinition).print();
  }

  protected createCalendarDaysTable(month: string, year: string) {
    const dayLabels = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const daysInMonth = this.getDaysInMonth(month, year);
    const tableBody = [];

    let rows = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, day);
      const dayOfWeek = date.getDay();
      const dayLabel = dayLabels[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
      rows.push([
        {
          text: day.toString(),
          style: ['number', this.isWorkingDay(date) ? 'open' : 'close'],
        },
        { text: dayLabel, style: ['label'] },
      ]);
      if (rows.length === 7) {
        tableBody.push(rows);
        rows = [];
      }
    }
    if (rows.length > 0) {
      // Add any remaining rows to the table
      while (rows.length < 7) {
        rows.push({ text: '' });
      }

      tableBody.push(rows);
    }

    return tableBody;
  }

  protected getDaysInMonth(month: string, year: string): number {
    const monthIndex = parseInt(month, 10) - 1;
    const date = new Date(parseInt(year, 10), monthIndex + 1, 0);
    return date.getDate();
  }

  protected isWorkingDay(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return this.isWeekend(date) === false;
  }

  protected isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    // Assuming Saturday and Sunday are weekends (0 = Sunday, 6 = Saturday)
    return dayOfWeek === 0 || dayOfWeek === 6;
  }
}
