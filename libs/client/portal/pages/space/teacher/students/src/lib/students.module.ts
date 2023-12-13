import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ClientPortalStoresSpaceTeacherStudentsModule } from '@klazzroom/client-portal-stores-space-teacher-students';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { SearchComponent } from './components/search/search.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AddComponent } from './containers/add/add.component';
import { DetailsComponent } from './containers/details/details.component';
import { EditComponent } from './containers/edit/edit.component';
import { EmptyComponent } from './containers/empty/empty.component';
import { ListComponent } from './containers/list/list.component';
import { RemoveComponent } from './containers/remove/remove.component';
import { studentsRoutes } from './lib.routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
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
    SearchComponent,
  ],
})
export class SpaceTeacherStudentsModule {}
