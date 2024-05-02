import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SpaceTeacherStudentsModule } from '@klazzroom/client-portal-pages-space-teacher-students';
import {
  SpaceTeacherStudentsActions,
  SpaceTeacherStudentsSelectors,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import {
  SpaceSelectors,
  TeacherSpace,
} from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'klazzroom-client-space-dashboard-widgets-students',
  standalone: true,
  imports: [CommonModule, SpaceTeacherStudentsModule],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPortalSpaceDashboardWidgetsStudentsWidgetComponent
  implements OnInit, OnDestroy
{
  private ngSubscribeAll = new Subject<void>();
  total$: Observable<number>;

  constructor(private store: Store) {
    this.total$ = this.store
      .select(SpaceTeacherStudentsSelectors.selectAll)
      .pipe(map((students) => students.length));
  }

  ngOnInit(): void {
    this.store
      .select(SpaceSelectors.selectCurrentSpace)
      .pipe(takeUntil(this.ngSubscribeAll))
      .subscribe((space) => {
        if (space) {
          this.store.dispatch(
            SpaceTeacherStudentsActions.init({
              course: (space as TeacherSpace).course,
            })
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.ngSubscribeAll.next();
    this.ngSubscribeAll.complete();
  }
}
