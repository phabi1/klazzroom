import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject, map, takeUntil } from 'rxjs';
import { Holiday } from '../../models/holiday.model';
import { GET_HOLIDAYS_GQL } from '../../graphql/queries';
import { HolidayService } from '../../services/holiday.service';

@Component({
  selector: 'klazzroom-client-portal-pages-holidays-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit, OnDestroy {
  private _ngSubscribeAll = new Subject<void>();
  private _apollo = inject(Apollo);
  private _holidayService = inject(HolidayService);

  public items: Holiday[] = [];
  public displayedColumns: string[] = ['title', 'zone', 'startAt', 'endAt', 'actions'];

  ngOnInit(): void {
    this._apollo
      .watchQuery<{ holidays: Holiday[] }>({
        query: GET_HOLIDAYS_GQL,
        variables: {
          tags: this._holidayService.getZones().map((zone) => zone.id),
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.holidays),
        takeUntil(this._ngSubscribeAll)
      )
      .subscribe((holidays) => {
        this.items = holidays;
      });
  }

  ngOnDestroy(): void {
    this._ngSubscribeAll.next();
    this._ngSubscribeAll.complete();
  }
}
