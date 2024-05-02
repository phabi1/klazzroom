import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  SpaceTeacherStudentsActions,
  SpaceTeacherStudentsSelectors,
  Student,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import {
  SpaceSelectors,
  TeacherSpace,
} from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  private ngSubscribeAll: Subject<void> = new Subject<void>();

  public searchInput = new FormControl('');

  public loaded$ = this.store.select(
    SpaceTeacherStudentsSelectors.selectLoaded
  );

  public students$ = combineLatest([
    this.store.select(SpaceTeacherStudentsSelectors.selectAll),
    this.searchInput.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    ),
  ]).pipe(
    map(([students, search]) => {
      return this.filterStudents(students, search || '').sort((a, b) => {
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
      });
    })
  );

  constructor(private store: Store) {}

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

  private filterStudents(students: Student[], search: string): Student[] {
    if (search === '') {
      return students;
    }
    return students.filter((student) => {
      return (
        student.firstname.toLowerCase().includes(search.toLowerCase()) ||
        student.lastname.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
