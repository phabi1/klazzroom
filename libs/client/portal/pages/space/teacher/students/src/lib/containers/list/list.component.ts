import { Component, OnInit } from '@angular/core';
import {
  SpaceTeacherStudentsActions,
  SpaceTeacherStudentsSelectors,
  Student,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import { SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, withLatestFrom } from 'rxjs';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public filter$ = new BehaviorSubject<string>('');

  public loaded$ = this.store.select(
    SpaceTeacherStudentsSelectors.selectLoaded
  );

  public students$ = this.store
    .select(SpaceTeacherStudentsSelectors.selectAll)
    .pipe(
      withLatestFrom(this.filter$),
      map(([students, search]) =>
        this.filter(students, search).sort((a, b) => {
          if (a.firstname < b.firstname) {
            return -1;
          } else if (a.firstname > b.firstname) {
            return 1;
          }

          if (a.lastname < b.lastname) {
            return -1;
          } else if (a.lastname > b.lastname) {
            return 1;
          } else {
            return 0;
          }
        })
      )
    );

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

  onSearch(search: string) {
    this.filter$.next(search);
  }

  private filter(students: Student[], search: string): Student[] {
    return students.filter((student) => {
      return (
        student.firstname.toLowerCase().includes(search.toLowerCase()) ||
        student.lastname.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
