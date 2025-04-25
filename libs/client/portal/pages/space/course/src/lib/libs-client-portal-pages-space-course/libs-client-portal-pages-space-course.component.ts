import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, LibsClientCommonUiPageComponent } from '@klazzroom/libs-client-common-ui-page';
import {
  CourseFormGQL,
  UpdateCourseGQL,
} from '@klazzroom/libs-client-portal-graphql-course';
import { SpacesStore } from '@klazzroom/libs-client-portal-stores-space';
import { FormlyModule } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-libs-client-portal-pages-space-course',
  standalone: true,
  imports: [CommonModule, LibsClientCommonUiPageComponent, FormlyModule],
  templateUrl: './libs-client-portal-pages-space-course.component.html',
  styleUrl: './libs-client-portal-pages-space-course.component.css',
})
export class LibsClientPortalPagesSpaceCourseComponent implements OnInit {
  private spaceStore = inject(SpacesStore);
  private getCourseGql = inject(CourseFormGQL);
  private updateCourseGql = inject(UpdateCourseGQL);
  private snackBar = inject(MatSnackBar);

  private courseId = '';
  private gradeOptions$ = new BehaviorSubject<any[]>([]);

  form = new FormGroup({});
  model: {
    gradeIds: string[];
    holidayZone: string;
  } = {
    gradeIds: [],
    holidayZone: '',
  };
  fields = [
    {
      key: 'gradeIds',
      type: 'select',
      props: {
        label: 'Grade',
        placeholder: 'Select a grade',
        multiple: true,
        options: this.gradeOptions$.asObservable(),
      },
    },
    {
      key: 'holidayZone',
      type: 'select',
      props: {
        label: 'Holiday Zone',
        placeholder: 'Select a holiday zone',
        options: [
          { label: 'Zone A', value: 'a' },
          { label: 'Zone B', value: 'b' },
          { label: 'Zone C', value: 'c' },
        ],
      },
    },
  ];

  actions: Action[] = [
    {
      name: 'save',
      label: 'Save',
      handle: () => this.save(),
    },
  ];

  ngOnInit(): void {
    const currentSpace = this.spaceStore.currentSpace();
    if (!currentSpace) {
      this.snackBar.open('No space selected', 'Close', {
        duration: 2000,
      });
      return;
    }

    this.courseId = (currentSpace as any).courseId;

    this.getCourseGql.fetch({ id: this.courseId }).subscribe({
      next: (res) => {
        this.gradeOptions$.next(
          res.data.grades.map((grade: any) => ({
            label: grade.title,
            value: grade.id,
          }))
        );
        this.model = {
          ...res.data.course,
          gradeIds: res.data.course.grades.map((grade: any) => grade.id),
        };
      },
      error: (err) => {
        this.snackBar.open('Error fetching course data', 'Close', {
          duration: 2000,
        });
      },
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const currentSpace = this.spaceStore.currentSpace();
    if (!currentSpace) {
      this.snackBar.open('No space selected', 'Close', {
        duration: 2000,
      });
      return;
    }

    this.updateCourseGql
      .mutate({
        id: this.courseId,
        input: {
          gradeIds: this.model.gradeIds,
          holidayZone: this.model.holidayZone,
        },
      })
      .subscribe({
        next: (res) => {
          this.snackBar.open('Course updated successfully', 'Close', {
            duration: 2000,
          });
        },
        error: (err) => {
          this.snackBar.open('Error updating course', 'Close', {
            duration: 2000,
          });
        },
      });
  }
}
