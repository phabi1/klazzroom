import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  EventInput,
  SpaceTeacherTimetableActions,
  SpaceTeacherTimetableSelectors,
} from '@klazzroom/client-portal-stores-space-teacher-timetable';
import { Store } from '@ngrx/store';
import {
  CalendarDateFormatter,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { Subject, catchError, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { TimetableEvent } from '../../models/timetable-event.model';
import { DateFormatter } from '../../providers/date-formatter.provider';

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
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['timetable']),
        tap((id) =>
          this.store.dispatch(
            SpaceTeacherTimetableActions.loadTimetable({ id })
          )
        ),
        switchMap((timetable) =>
          this.store.select(SpaceTeacherTimetableSelectors.selectEntities)
            .pipe(
              map((entities) => entities[timetable]),
              catchError((error) => {
                return of(null);
              }
            )
          )
        ),
        takeUntil(this.ngSubscribeAll)
      )
      .subscribe((timetable) => {
        if (timetable) {
          this.timetable = timetable?.id;
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
    this.store.dispatch(
      SpaceTeacherTimetableActions.updateTimetable({
        id: this.timetable,
        input: {
          events: this.transformEventToInput(this.events),
        },
      })
    );
    this.refresh.next();
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
          this.store.dispatch(
            SpaceTeacherTimetableActions.updateTimetable({
              id: this.timetable,
              input: {
                events: this.transformEventToInput(this.events),
              },
            })
          );
        }
        this.refresh.next();
      });
  }

  private transformEventToInput(events: TimetableEvent[]): EventInput[] {
    return events.map((event) => {
      return {
        start: event.start,
        end: event.end,
        title: event.title,
        type: event.meta?.type || 'LESSON',
      };
    });
  }
}
