import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Sex,
  SpaceTeacherStudentsActions,
  SpaceTeacherStudentsSelectors,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldSelectProps } from '@ngx-formly/core/select';
import { filter, first } from 'rxjs';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  form = new FormGroup({});
  model = {
    firstname: '',
    lastname: '',
    grade: '',
    sex: 'boy',
    birthday: null,
    comments: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex gap-4 w-full',
      fieldGroup: [
        {
          key: 'firstname',
          type: 'input',
          props: { label: 'Firstname', required: true },
          className: 'flex-1',
        },
        {
          key: 'lastname',
          type: 'input',
          props: { label: 'Lastname', required: true },
          className: 'flex-1',
        },
      ],
    },
    {
      key: 'grade',
      type: 'select',
      props: {
        required: true,
        label: 'Grade',
      },
    },
    {
      key: 'sex',
      type: 'radio',
      props: {
        label: 'Sex',
        options: [
          { label: 'Girl', value: 'girl' },
          { label: 'Boy', value: 'boy' },
        ],
      },
    },
    {
      key: 'birthday',
      type: 'datepicker',
      props: {
        label: 'Birthday',
      },
    },
    {
      key: 'comments',
      type: 'textarea',
      props: {
        label: 'Comments',
        rows: 5,
      },
    },
  ];

  constructor(
    private store: Store,
    private actions: Actions,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store
      .select(SpaceTeacherStudentsSelectors.selectGrades)
      .pipe(
        filter((grades) => grades.length > 0),
        first()
      )
      .subscribe((grades) => {
        if (this.fields && this.fields.length > 0) {
          (this.fields[1].props as FormlyFieldSelectProps).options = grades.map(
            (grade) => ({ label: grade.title, value: grade.id })
          );
        }
      });
  }

  submit() {
    if (this.form.invalid) return;

    this.store
      .select(SpaceTeacherStudentsSelectors.selectCourse)
      .pipe(first())
      .subscribe((course) => {
        if (course) {
          this.store.dispatch(
            SpaceTeacherStudentsActions.addStudent({
              student: {
                ...this.model,
                sex: this.model.sex === 'Boy' ? Sex.Boy : Sex.Girl,
                course,
              },
            })
          );

          this.actions
            .pipe(
              ofType(SpaceTeacherStudentsActions.addStudentSuccess),
              first()
            )
            .subscribe((action) => {
              this.router.navigate(['..', action.student.id], {relativeTo: this.route});
            });
        }
      });
  }
}
