import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ClientPortalStoresSpaceTeacherStudentsModule } from '@klazzroom/client-portal-stores-space-teacher-students';
import { ClientCommonFormFieldRepeatModule } from '@klazzroom/client-common-form-field-repeat';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AddComponent } from './containers/add/add.component';
import { DetailsComponent } from './containers/details/details.component';
import { EditComponent } from './containers/edit/edit.component';
import { EmptyComponent } from './containers/empty/empty.component';
import { ListComponent } from './containers/list/list.component';
import { RemoveComponent } from './containers/remove/remove.component';
import { studentsRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatNativeDateModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    ClientCommonFormFieldRepeatModule,
    ClientPortalStoresSpaceTeacherStudentsModule,
    RouterModule.forChild(studentsRoutes),
  ],
  declarations: [
    ListComponent,
    StudentListComponent,
    EmptyComponent,
    AddComponent,
    EditComponent,
    RemoveComponent,
    RemoveComponent,
    DetailsComponent,
    ContactListComponent,
    ContactFormComponent,
  ],
})
export class SpaceTeacherStudentsModule {}
