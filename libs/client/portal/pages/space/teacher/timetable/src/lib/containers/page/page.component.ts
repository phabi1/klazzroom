import { Component } from '@angular/core';

@Component({
  selector: 'klazzroom-portal-space-teacker-timetable-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent {
  viewDate: Date = new Date();
  events = [];
}
