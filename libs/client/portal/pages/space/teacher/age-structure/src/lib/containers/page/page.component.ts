import { Component, OnInit } from '@angular/core';
import {
  SpaceTeacherAgeStructureActions,
  SpaceTeacherAgeStructureSelectors,
} from '@klazzroom/client-portal-stores-space-teacher-age-structure';
import {
  SpaceSelectors,
  TeacherSpace,
} from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';

@Component({
  selector: 'klazzroom-klazzroom-portal-pages-space-teacher-age-structure-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  loading$ = this.store.select(SpaceTeacherAgeStructureSelectors.selectLoading);
  students$ = this.store.select(
    SpaceTeacherAgeStructureSelectors.selectStudents
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(SpaceSelectors.selectCurrentSpace)
      .pipe(first())
      .subscribe((space) => {
        if (!space) return;
        this.store.dispatch(
          SpaceTeacherAgeStructureActions.load({
            course: (space as TeacherSpace).course,
          })
        );
      });
  }
}
