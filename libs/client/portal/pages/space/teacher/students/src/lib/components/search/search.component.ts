import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
}
