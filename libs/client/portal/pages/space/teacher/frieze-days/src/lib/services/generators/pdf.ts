import { formatDate } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Holiday } from '../../models/holiday.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PdfGenerator {
  public locale = 'fr-FR';
  public holidays: Holiday[] = [];

  generate(month: number, year: number) {
    const margin = 10;
    const columnsByPage = 5;
    const cellWidth = 100 / columnsByPage + '%';

    const docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [margin, margin, margin, margin],
      content: [
        {
          table: {
            dontBreakRows: true,
            widths: Array.from({ length: columnsByPage }).map(() => cellWidth),
            body: this.generateTableBody(month, year, columnsByPage),
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).open();
  }

  private generateTableBody(
    month: number,
    year: number,
    columns: number
  ): any[] {
    const date = new Date(year, month + 1, 0);
    const numberOfDays = date.getDate();
    const maxRows = Math.ceil(numberOfDays / columns);

    const rows: any[] = [];
    for (let i = 0; i < maxRows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        if (i * columns + j + 1 > numberOfDays) {
          row.push({ text: '' });
          continue;
        }

        const day = new Date(year, month, i * columns + j + 1);

        let color = 'green';
        if (this.isDayOff(day)) {
          color = 'red';
        }

        row.push([
          {
            text: formatDate(day, 'd', this.locale),
            alignment: 'center',
            fontSize: 72,
            bold: true,
            color,
            margin: [0, 40, 0, 40],
          },
          {
            text: formatDate(day, 'EEEE', this.locale).toUpperCase(),
            alignment: 'center',
            fontSize: 24,
            margin: [0, 10, 0, 10],
          },
        ]);
      }
      rows.push(row);
    }
    return rows;
  }

  private isDayOff(date: Date) {
    if (date.getDay() === 0 || date.getDay() === 6 || date.getDay() === 3) {
      return true;
    }

    for (const holiday of this.holidays) {
      if (holiday.isHoliday(date)) {
        return true;
      }
    }

    return false;
  }
}
