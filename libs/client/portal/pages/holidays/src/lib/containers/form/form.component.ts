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
  CREATE_HOLIDAY_GQL,
  UPDATE_HOLIDAY_GQL,
} from '../../graphql/mutations';
import { GET_HOLIDAYS_GQL, GET_HOLIDAY_GQL } from '../../graphql/queries';
import { Holiday } from '../../models/holiday.model';
import { HolidayService } from '../../services/holiday.service';

@Component({
  selector: 'klazzroom-client-portal-pages-holidays-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private _apollo: Apollo = inject(Apollo);
  private _dialog: MatDialog = inject(MatDialog);
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _holidayService = inject(HolidayService);
  private _item: Holiday | null = null;
  private _dialogRef: MatDialogRef<any> | null = null;

  @ViewChild('dialogTpl', { static: true })
  dialogTpl!: TemplateRef<any>;

  form = new FormGroup({});
  model: {
    title: string;
    startAt: Date | null;
    endAt: Date | null;
    zone: string;
  } = {
    title: '',
    startAt: null,
    endAt: null,
    zone: '',
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
      key: 'startAt',
      type: 'datepicker',
      props: {
        label: 'Start at',
        required: true,
      },
    },
    {
      key: 'endAt',
      type: 'datepicker',
      props: {
        label: 'End at',
        required: true,
      },
    },
    {
      key: 'zone',
      type: 'select',
      props: {
        label: 'Zone',
        required: true,
        options: this._holidayService.getZones().map((zone) => ({
          label: zone.name,
          value: zone.id,
        })),
      },
    },
  ];

  ngOnInit(): void {
    const id = this._route.snapshot.params['holiday'];
    if (id) {
      this._apollo
        .query<{ holiday: Holiday }>({
          query: GET_HOLIDAY_GQL,
          variables: { id },
        })
        .subscribe((result) => {
          this._item = result.data.holiday;

          const zone =
            result.data.holiday.tags.filter((tag) =>
              tag.startsWith('zone:')
            )[0] || '';

          this.model = {
            title: result.data.holiday.title,
            startAt: result.data.holiday.startAt,
            endAt: result.data.holiday.endAt,
            zone,
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
    const id = this._route.snapshot.params['holiday'];
    if (id) {
      const tags =
        this._item?.tags.filter((tag) => !tag.startsWith('zone:')) || [];
      tags.push(this.model.zone);

      this._apollo
        .mutate({
          mutation: UPDATE_HOLIDAY_GQL,
          variables: {
            id,
            input: {
              title: this.model.title,
              startAt: this.model.startAt,
              endAt: this.model.endAt,
              tags,
            },
          },
          refetchQueries: [
            { query: GET_HOLIDAY_GQL, variables: { id } },
            this.refreshHolidaysQuery(),
          ],
        })
        .subscribe(() => {
          this._dialogRef?.close();
        });
    } else {
      this._apollo
        .mutate({
          mutation: CREATE_HOLIDAY_GQL,
          variables: {
            input: {
              title: this.model.title,
              startAt: this.model.startAt,
              endAt: this.model.endAt,
              tags: [`${this.model.zone}`],
            },
          },
          refetchQueries: [this.refreshHolidaysQuery()],
        })
        .subscribe(() => {
          this._dialogRef?.close();
        });
    }
  }

  protected refreshHolidaysQuery() {
    return {
      query: GET_HOLIDAYS_GQL,
      variables: {
        tags: this._holidayService.getZones().map((zone) => zone.id),
      },
    };
  }
}
