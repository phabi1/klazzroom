import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import {
  AddStudentToCourseGQL,
  GetStudentDetailsGQL,
  UpdateStudentGQL,
} from '@klazzroom/libs-client-portal-graphql-teacher-students';
import { TeacherStudentsStore } from '@klazzroom/libs-client-portal-stores-teacher-students';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs';

@Component({
  selector: 'lib-libs-client-portal-pages-space-teacher-students-form',
  standalone: true,
  imports: [CommonModule, FormlyModule, FormlyMaterialModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(TeacherStudentsStore);
  private readonly getStudentDetailsGQL = inject(GetStudentDetailsGQL);
  private readonly addStudentToCourseGQL = inject(AddStudentToCourseGQL);
  private readonly updateStudentGQL = inject(UpdateStudentGQL);
  private readonly snackBar = inject(MatSnackBar);

  loading = signal(false);
  processing = signal(false);

  form = new FormGroup({});
  model: {
    firstname: string;
    lastname: string;
    gradeId: string;
    birthday: Date | null;
    sex: 'Boy' | 'Girl' | 'Unknown';
  } = {
    firstname: '',
    lastname: '',
    gradeId: '',
    birthday: null,
    sex: 'Unknown',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstname',
      type: 'input',
      props: {
        label: 'First Name',
        placeholder: 'Enter first name',
        required: true,
      },
    },
    {
      key: 'lastname',
      type: 'input',
      props: {
        label: 'Last Name',
        placeholder: 'Enter last name',
        required: true,
      },
    },
    {
      key: 'gradeId',
      type: 'select',
      props: {
        label: 'Grade',
        placeholder: 'Select grade',
        required: true,
        options: [],
      },
    },
    {
      key: 'birthday',
      type: 'input',
      props: {
        label: 'Birthday',
        placeholder: 'Enter birthday',
        required: true,
        type: 'date',
      },
    },
    {
      key: 'sex',
      type: 'radio',
      props: {
        label: 'Sex',
        required: true,
        options: [
          {
            value: 'Boy',
            label: 'Boy',
          },
          {
            value: 'Girl',
            label: 'Girl',
          },
          {
            value: 'Unknown',
            label: 'Unknown',
          },
        ],
      },
    },
  ];

  mode = computed(() => {
    const studentId = this.route.snapshot.paramMap.get('studentId');
    return studentId ? 'edit' : 'add';
  });

  constructor() {
    effect(() => {
      const gradeOptions = this.store.grades().map((grade) => ({
        label: grade.title,
        value: grade.id,
      }));
      if (this.fields[2] && this.fields[2].props) {
        this.fields[2].props.options = gradeOptions;
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const studentId = params['studentId'];
      this.loading.set(true);
      if (studentId) {
        this.getStudentDetailsGQL
          .fetch({
            courseId: this.store.courseId() || '',
            studentId: studentId,
          })
          .subscribe((result) => {
            this.loading.set(false);
            if (result.data.course.student) {
              const student = result.data.course.student;
              this.model = {
                firstname: student.firstname,
                lastname: student.lastname,
                gradeId: student.grade?.id,
                birthday: student.birthday || null,
                sex: student.sex || 'Unknown',
              };
            }
          });
      } else {
        this.model = {
          firstname: '',
          lastname: '',
          gradeId: '',
          birthday: null,
          sex: 'Unknown',
        };
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.processing.set(true);
    if (this.mode() === 'add') {
      this.addStudentToCourseGQL
        .mutate({
          input: {
            firstname: this.model['firstname'],
            lastname: this.model['lastname'],
            gradeId: this.model['gradeId'],
          },
          courseId: this.store.courseId() || '',
        })
        .pipe(
          map((result) => result.data?.createStudent),
          tap((student) => {
            if (student) {
              this.store.addStudent(student as any);
            }
          })
        )
        .subscribe({
          next: () => {
            this.processing.set(false);
            this.snackBar.open('Student added successfully', 'Close', {
              duration: 2000,
            });
          },
          error: (error) => {
            this.processing.set(false);
            this.snackBar.open(error.message, 'Close', {
              duration: 2000,
            });
          },
        });
    } else {
      const studentId = this.route.snapshot.paramMap.get('studentId');
      if (studentId) {
        this.updateStudentGQL
          .mutate({
            id: studentId,
            input: {
              firstname: this.model['firstname'],
              lastname: this.model['lastname'],
              gradeId: this.model['gradeId'],
            },
          })
          .pipe(
            map((result) => result.data?.updateStudent),
            tap((student) => {
              if (student) {
                this.store.updateStudent(studentId, student as any);
              }
            })
          )
          .subscribe({
            next: () => {
              this.processing.set(false);
              this.snackBar.open('Student updated successfully', 'Close', {
                duration: 2000,
              });
            },
            error: (error) => {
              this.processing.set(false);
              this.snackBar.open(error.message, 'Close', {
                duration: 2000,
              });
            },
          });
      }
    }
  }

  onCancel() {
    console.log('Form cancelled');
  }
}
