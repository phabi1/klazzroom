import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Apollo } from 'apollo-angular';
import {
  CREATE_DOMAIN_GQL,
  UPDATE_DOMAIN_GQL,
} from '../../../graphql/mutations';
import { GET_DOMAINS_GQL, GET_DOMAIN_GQL } from '../../../graphql/queries';

@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private _apollo: Apollo = inject(Apollo);
  private _dialog: MatDialog = inject(MatDialog);
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);

  private _dialogRef: MatDialogRef<any> | null = null;

  @ViewChild('dialogTpl', { static: true })
  dialogTpl!: TemplateRef<any>;

  form = new FormGroup({});
  model = {
    title: '',
    color: '',
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
    {
      key: 'color',
      type: 'input',
      props: {
        label: 'Color',
        required: true,
      },
    },
  ];

  ngOnInit(): void {
    const id = this._route.snapshot.params['domain'];
    if (id) {
      this._apollo
        .query<{ skillDomain: any }>({
          query: GET_DOMAIN_GQL,
          variables: { id },
        })
        .subscribe((result) => {
          this.model = {
            title: result.data.skillDomain.title,
            color: result.data.skillDomain.color,
          };
        });
    }
    this._dialogRef = this._dialog.open(this.dialogTpl);
    this._dialogRef.afterClosed().subscribe(() => {
      if (id) {
        this._router.navigate(['../..'], { relativeTo: this._route });
      } else {
        this._router.navigate(['..'], { relativeTo: this._route });
      }
    });
  }

  save() {
    const id = this._route.snapshot.params['domain'];
    if (id) {
      this._apollo
        .mutate({
          mutation: UPDATE_DOMAIN_GQL,
          variables: { id, input: this.model },
          refetchQueries: [
            { query: GET_DOMAIN_GQL, variables: { id } },
            { query: GET_DOMAINS_GQL },
          ],
        })
        .subscribe(() => {
          this._dialogRef?.close();
        });
    } else {
      this._apollo
        .mutate({
          mutation: CREATE_DOMAIN_GQL,
          variables: { input: this.model },
          refetchQueries: [{ query: GET_DOMAINS_GQL }],
        })
        .subscribe(() => {
          this._dialogRef?.close();
        });
    }
  }
}
