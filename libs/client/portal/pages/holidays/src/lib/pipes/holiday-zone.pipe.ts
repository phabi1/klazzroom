import { Pipe, PipeTransform, inject } from '@angular/core';
import { HolidayService } from '../services/holiday.service';

@Pipe({
  name: 'holidayZone',
})
export class HolidayZonePipe implements PipeTransform {
  private _holidayService: HolidayService = inject(HolidayService);
  transform(value: Array<string> | string): unknown {
    if (Array.isArray(value)) {
      value = value.find((v) => v.startsWith('zone:')) || '';
    }

    const zones = this._holidayService.getZones();
    const zone = zones.find((z) => z.id === value);

    return zone?.name || value;
  }
}
