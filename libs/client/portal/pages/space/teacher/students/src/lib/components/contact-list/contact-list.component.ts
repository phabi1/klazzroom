import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import {
  ContactInfo,
  SpaceTeacherStudentsContactActions,
} from '@klazzroom/client-portal-stores-space-teacher-students';
import { Store } from '@ngrx/store';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  @Input()
  student = '';

  @Input()
  contacts: ContactInfo[] = [];

  constructor(private dialog: MatDialog, private store: Store) {}

  newContact() {
    this.showContactForm();
  }

  editContact(id: string) {
    this.showContactForm(this.contacts.find((c) => c.id === id));
  }

  deleteContact(id: string) {
    this.store.dispatch(
      SpaceTeacherStudentsContactActions.deleteContact({ id })
    );
  }

  private showContactForm(contact?: ContactInfo) {
    this.dialog.open(ContactFormComponent, {
      data: {
        student: this.student,
        contact,
      },
    });
  }
}
