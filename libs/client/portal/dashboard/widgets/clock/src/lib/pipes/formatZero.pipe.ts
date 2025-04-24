import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatZero',
  standalone: true,
})
export class FormatZeroPipe implements PipeTransform {
  transform(value: number, length = 2, ...args: unknown[]): unknown {
    return value.toString().padStart(length, '0');
  }
}
