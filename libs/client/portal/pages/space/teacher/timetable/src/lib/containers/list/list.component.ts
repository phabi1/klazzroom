import { Component, OnInit, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import { GET_TIMETABLES_GQL } from '../../graphql/queries';
import { Timetable } from '../../models/timetable.model';

@Component({
  selector: 'klazzroom-portal-space-teacker-timetable-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  private apollo = inject(Apollo);

  loading = false;
  items: Timetable[] = [];

  ngOnInit(): void {
    this.loading = true;
    this.apollo
      .query<{ timetables: Timetable[] }>({
        query: GET_TIMETABLES_GQL,
        variables: { tags: [] },
      })
      .subscribe((res) => {
        this.items = res.data.timetables;
        this.loading = false;
      });
  }
}
