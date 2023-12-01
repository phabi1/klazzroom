import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SpaceTeacherStudentsActions,
  SpaceTeacherStudentsSelectors,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import { SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public loaded$ = this.store.select(
    SpaceTeacherStudentsSelectors.selectLoaded
  );

  public students$ = this.store.select(SpaceTeacherStudentsSelectors.selectAll);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(SpaceSelectors.selectCurrentSpace).subscribe((space) => {
      if (space) {
        this.store.dispatch(
          SpaceTeacherStudentsActions.init({
            course: space.course,
          })
        );
      }
    });
  }
}
