import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Apollo } from 'apollo-angular';
import { selectCurrentSpace } from 'libs/client/portal/stores/spaces/src/lib/selectors/space.selectors';
import { switchMap, take } from 'rxjs';
import { GET_COURSE_GQL } from '../../graphql/queries';

@Component({
  selector: 'klazzroom-client-portal-space-teacher-course-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  private _apollo: Apollo = inject(Apollo);
  protected store: Store = inject(Store);

  form = new FormGroup({});
  model: { grades: string[]; zone: string } = {
    grades: [],
    zone: 'c',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'grades',
      type: 'select',
      props: {
        label: 'Grades',
        required: true,
      },
    },
    {
      key: 'zone',
      type: 'input',
      props: {
        label: 'Zone',
        required: true,
      },
    },
  ];

  ngOnInit(): void {
    this.store
      .select(selectCurrentSpace)
      .pipe(
        take(1),
        switchMap((space) =>
          this._apollo.query<{ grades: any[]; course: any }>({
            query: GET_COURSE_GQL,
            variables: {
              id: (space as any).course,
            },
          })
        )
      )
      .subscribe(({ data }) => {
        if (this.fields[0] && this.fields[0].props) {
          this.fields[0].props.options = data.grades.map((grade) => ({
            label: grade.title,
            value: grade.id,
          }));
        }
        this.model = {
          grades: data.course.grades.map((grade: any) => grade.id),
          zone: data.course.zone,
        };
      });
  }
}
