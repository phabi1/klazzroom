import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpaceSelectors } from '@klazzroom/client-portal-stores-spaces';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Apollo } from 'apollo-angular';
import { switchMap } from 'rxjs';
import { CREATE_TIMETABLE_GQL } from '../../graphql/mutations';

@Component({
  selector: 'klazzroom-portal-space-teacker-timetable-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private apollo = inject(Apollo);
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private dialogRef: MatDialogRef<any> | null = null;

  @ViewChild('dialogTpl', { static: true })
  dialogTpl!: TemplateRef<any>;

  form = new FormGroup({});
  model = {
    title: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Title',
        required: true,
      },
    },
  ];

  ngOnInit(): void {
    this.dialogRef = this.dialog.open(this.dialogTpl, { width: '320px' });
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['..']);
    });
  }

  save() {
    if (this.form.valid) {
      this.store
        .select(SpaceSelectors.selectCurrentSpace)
        .pipe(
          switchMap((space: any) =>
            this.apollo.mutate({
              mutation: CREATE_TIMETABLE_GQL,
              variables: {
                input: {
                  title: this.model.title,
                  tags: ['course:' + space.course],
                },
              },
            })
          )
        )
        .subscribe(() => this.dialogRef?.close());
    }
  }
}
