/// <reference types="@angular/localize" />
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  ContactInfo,
  CreateContactInfoInput,
  SpaceTeacherStudentsContactActions,
  UpdateContactInfoInput,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';

export interface ContactModel {
  firstname: string;
  lastname: string;
  emails: { type: string; value: string }[];
  phones: { type: string; value: string }[];
}

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  mode: 'add' | 'update' = 'add';
  form = new FormGroup({});
  model: ContactModel = {
    firstname: '',
    lastname: '',
    emails: [{ type: '', value: '' }],
    phones: [{ type: '', value: '' }],
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstname',
      type: 'input',
      props: {
        label: $localize`:@@spaceTeacherStudents.details.contacts.form.fields.firstname.label:Firstname`,
        required: true,
      },
    },
    {
      key: 'lastname',
      type: 'input',
      props: {
        label: $localize`:@@spaceTeacherStudents.details.contacts.form.fields.lastname.label:Lastname`,
        required: true,
      },
    },
    {
      key: 'emails',
      type: 'repeat',
      props: {
        label: $localize`:@@spaceTeacherStudents.details.contacts.form.fields.emails.label:Emails`,
        addText: $localize`:@@commons.buttons.addAnother:Add another`
      },
      fieldArray: {
        fieldGroupClassName: 'flex',
        fieldGroup: [
          {
            key: 'type',
            type: 'select',
            props: {
              label: $localize`:@@spaceTeacherStudents.details.contacts.form.fields.emailType.label:Type`,
              required: true,
              options: [
                {
                  label: 'Personal',
                  value: 'PERSONAL',
                },
                {
                  label: 'Work',
                  value: 'WORK',
                },
              ],
            },
          },
          {
            key: 'value',
            type: 'input',
            props: {
              label: $localize`:@@spaceTeacherStudents.details.contacts.form.fields.email.label:Email`,
              required: true,
            },
            className: 'flex-1',
          },
        ],
      },
    },
    {
      key: 'phones',
      type: 'repeat',
      props: {
        label: $localize`:@@spaceTeacherStudents.details.contacts.form.fields.phones.label:Phone numbers`,
        addText: $localize`:@@commons.buttons.addAnother:Add another`
      },
      fieldArray: {
        fieldGroupClassName: 'flex',
        fieldGroup: [
          {
            key: 'type',
            type: 'select',
            props: {
              label: $localize`:@@spaceTeacherStudents.details.contacts.form.fields.phoneType.label:Type`,
              required: true,
              options: [
                {
                  label: 'Mobile',
                  value: 'MOBILE',
                },
                {
                  label: 'Home',
                  value: 'HOME',
                },
                {
                  label: 'Work',
                  value: 'WORK',
                },
              ],
            },
          },
          {
            key: 'value',
            type: 'input',
            props: {
              label: $localize`:@@spaceTeacherStudents.details.contacts.form.fields.phone.label:Phone number`,
              required: true,
            },
            className: 'flex-1',
          },
        ],
      },
    },
  ];

  constructor(
    private dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      student: string;
      contact: ContactInfo;
    },
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    if (this.data.contact) {
      this.mode = 'update';
      this.model = this.data.contact;
    } else {
      this.mode = 'add';
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.data.contact) {
        const data: UpdateContactInfoInput = {
          ...this.model,
          emails: this.model.emails.filter((e) => e.value),
          phones: this.model.phones.filter((e) => e.value),
        };
        this.store.dispatch(
          SpaceTeacherStudentsContactActions.updateContact({
            id: this.data.contact.id,
            contact: data,
          })
        );
      } else {
        const data: CreateContactInfoInput = {
          ...this.model,
          emails: this.model.emails.filter((e) => e.value),
          phones: this.model.phones.filter((e) => e.value),
        };
        this.store.dispatch(
          SpaceTeacherStudentsContactActions.addContact({
            student: this.data.student,
            contact: data,
          })
        );
      }

      this.actions$
        .pipe(
          ofType(
            SpaceTeacherStudentsContactActions.addContactSuccess,
            SpaceTeacherStudentsContactActions.updateContactSuccess
          )
        )
        .subscribe(() => {
          this.form.reset();
          this.dialogRef.close();
        });
    }
  }
}
