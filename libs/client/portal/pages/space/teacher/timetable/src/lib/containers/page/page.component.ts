import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CalendarDateFormatter,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { Subject, catchError, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { TimetableEvent } from '../../models/timetable-event.model';
import { DateFormatter } from '../../providers/date-formatter.provider';
import { Apollo } from 'apollo-angular';
import { GET_TIMETABLE_GQL } from '../../graphql/queries';
import { SettingsFormComponent } from '../../components/settings-form/settings-form.component';

@Component({
  selector: 'klazzroom-portal-space-teacker-timetable-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: DateFormatter,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit {
  private ngSubscribeAll = new Subject();

  timetable = '';
  viewDate: Date = new Date('2023-12-18 00:00:00');
  excludeDays: number[] = [0, 3, 6];
  events: TimetableEvent[] = [];
  refresh: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((id) =>
          this.apollo.query<{ timetable: any }>({
            query: GET_TIMETABLE_GQL,
            variables: { id },
          })
        ),
        map((res) => res.data.timetable),
        takeUntil(this.ngSubscribeAll)
      )
      .subscribe((timetable) => {
        if (timetable) {
          this.timetable = timetable.id;
          this.events = timetable.events;
          this.refresh.next();
        }
      });
  }

  onEventClicked($event: {
    event: TimetableEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }) {
    console.log($event);
    this.showEventForm($event.event);
  }
  onHourSegmentClicked($event: { date: Date; sourceEvent: MouseEvent }) {
    const event = {
      start: $event.date,
      end: $event.date,
      title: '',
      meta: {
        type: 'LESSON',
        grades: [],
      },
    };
    this.showEventForm(event);
  }

  onEventTimesChanged($event: CalendarEventTimesChangedEvent<any>) {
    const event = $event.event;
    event.start = $event.newStart;
    event.end = $event.newEnd;

    this.refresh.next();
  }

  openSettings() {
    this.dialog.open(SettingsFormComponent, {
      position: { top: '16px', right: '16px' },
      width: '240px',
      height: 'calc(100% - 32px)',
    });
  }

  private showEventForm(event: TimetableEvent) {
    this.dialog
      .open(EventFormComponent, {
        data: { event },
        width: '516px',
      })
      .afterClosed()
      .subscribe((event: TimetableEvent) => {
        if (event) {
          this.events.push(event);
        }
        this.refresh.next();
      });
  }
}
