import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LibsClientCommonUiPageComponent } from '@klazzroom/libs-client-common-ui-page';
import { timetableDetailsStore } from '@klazzroom/libs-client-portal-stores-timetable';
import { CalendarModule } from 'angular-calendar';
import { EventFormComponent } from '../../components/event-form/event-form.component';

@Component({
  selector: 'lib-client-portal-pages-space-timetable-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    CalendarModule,
    LibsClientCommonUiPageComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [timetableDetailsStore],
})
export class DetailsComponent {
  private readonly dialog: MatDialog = inject(MatDialog);

  events = signal<any[]>([]);
  viewDate = signal(new Date());

  onHourSegmentClicked(event: any) {
    this.showEventForm({
      start: event.date,
      end: event.date,
      title: '',
    });
  }

  onEventClicked(event: any) {
    this.showEventForm(event);
  }

  private showEventForm(event: any) {
    const dialogRef = this.dialog.open(EventFormComponent, {
      data: {
        event,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.events.update((events) =>
          events.map((e) => (e === event ? result : e))
        );
      }
    });
  }
}
