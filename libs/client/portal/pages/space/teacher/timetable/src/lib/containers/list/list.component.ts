import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  SpaceTeacherTimetableActions,
  SpaceTeacherTimetableSelectors,
} from '@klazzroom/client-portal-stores-space-teacher-timetable';
import { SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AddFormComponent } from '../../components/add-form/add-form.component';

@Component({
  selector: 'klazzroom-portal-space-teacker-timetable-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  private ngSubscribeAll = new Subject();

  loading$: Observable<boolean>;
  items$: Observable<any[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.loading$ = this.store.select(
      SpaceTeacherTimetableSelectors.selectLoading
    );
    this.items$ = this.store.select(SpaceTeacherTimetableSelectors.selectAll);
  }

  ngOnInit(): void {
    this.store.select(SpaceSelectors.selectCurrentSpace).pipe(
      takeUntil(this.ngSubscribeAll),
    ).subscribe((space) => {
      if (space) {
        this.store.dispatch(
          SpaceTeacherTimetableActions.loadTimetables({ space: space?.id })
          );
        }
    });
  }

  addTimetable() {
    const dialogRef = this.dialog.open(AddFormComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          SpaceTeacherTimetableActions.addTimetable({ timetable: result })
        );
      }
    });
  }
}
