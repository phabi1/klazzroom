import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SpaceTeacherStudentsActions,
  SpaceTeacherStudentsSelectors,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import { Store } from '@ngrx/store';
import { Subject, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private ngSubscribeAll = new Subject();

  selectedStudent$ = this.store.select(
    SpaceTeacherStudentsSelectors.selectCurrentStudent
  );

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        startWith(this.route.snapshot.params['student']),
        takeUntil(this.ngSubscribeAll)
      )
      .subscribe((params) => {
        this.store.dispatch(
          SpaceTeacherStudentsActions.selectStudent({ id: params['student'] })
        );
      });
  }

  ngOnDestroy(): void {
    this.ngSubscribeAll.complete();
  }
}
