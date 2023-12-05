import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SpaceTeacherStudentsSelectors,
  SpaceTeacherStudentsActions,
  Student,
  Sex,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldSelectProps } from '@ngx-formly/core/select';
import { filter, first } from 'rxjs';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-ediit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  form = new FormGroup({});
  model: {
    firstname: string;
    lastname: string;
    grade: string;
    sex: string;
    birthday: Date | null;
    comments: string;
  } = {
    firstname: '',
    lastname: '',
    grade: 'Boy',
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
          { label: 'Girl', value: 'Girl' },
          { label: 'Boy', value: 'Boy' },
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

    this.store
      .select(SpaceTeacherStudentsSelectors.selectCurrentStudent)
      .pipe(
        filter((student) => !!student),
        first()
      )
      .subscribe((student) => {
        if (student) {
          this.model = {
            firstname: student.firstname,
            lastname: student.lastname,
            sex: student.sex === Sex.Boy ? 'Boy' : 'Girl',
            grade: student.grade.id,
            birthday: student.birthday ? new Date(student.birthday) : null,
            comments: student.comments,
          };
        }
      });
  }

  submit() {
    if (this.form.invalid) return;

    this.store
      .select(SpaceTeacherStudentsSelectors.selectCurrentStudent)
      .pipe(first())
      .subscribe((student) => {
        if (!student) return;

        this.store.dispatch(
          SpaceTeacherStudentsActions.updateStudent({
            id: student.id,
            student: {
              ...this.model,
              sex: this.model.sex === 'Boy' ? Sex.Boy : Sex.Girl,
            },
          })
        );

        this.actions
          .pipe(
            ofType(SpaceTeacherStudentsActions.updateStudentSuccess),
            first()
          )
          .subscribe(() => {
            this.router.navigate(['..'], { relativeTo: this.route });
          });
      });
  }
}
