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
import { CREATE_ITEM_GQL, UPDATE_ITEM_GQL } from '../../../graphql/mutations';
import { GET_ITEMS_GQL, GET_ITEM_GQL } from '../../../graphql/queries';
import { Item } from '../../../models/item.model';

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
    const id = this._route.snapshot.params['id'];
    if (id) {
      this._apollo
        .query<{ skillItem: Item }>({
          query: GET_ITEM_GQL,
          variables: { id },
        })
        .subscribe((result) => {
          this.model = {
            title: result.data.skillItem.title,
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
    const domain = this._route.snapshot.params['domain'];
    const id = this._route.snapshot.params['id'];
    if (id) {
      this._apollo
        .mutate({
          mutation: UPDATE_ITEM_GQL,
          variables: { id, input: this.model },
          refetchQueries: [
            { query: GET_ITEM_GQL, variables: { id } },
            { query: GET_ITEMS_GQL, variables: { domain } },
          ],
        })
        .subscribe(() => {
          this._dialogRef?.close();
        });
    } else {
      console.log(domain);
      this._apollo
        .mutate({
          mutation: CREATE_ITEM_GQL,
          variables: { input: { ...this.model, domain } },
          refetchQueries: [{ query: GET_ITEMS_GQL, variables: { domain } }],
        })
        .subscribe(() => {
          this._dialogRef?.close();
        });
    }
  }
}
