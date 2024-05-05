import { Injectable } from '@angular/core';

@Injectable()
export class HolidayService {

  getZones() {
    return [
      { id: 'zone:all', name: 'Toutes les zones' },
      { id: 'zone:a', name: 'Zone A' },
      { id: 'zone:b', name: 'Zone B' },
      { id: 'zone:c', name: 'Zone C' },
      { id: 'zone:corse', name: 'Corse'}
    ];
  }
}
