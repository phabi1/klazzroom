import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ClientPortalStoresSpaceTeacherStudentsModule } from '@klazzroom/client-portal-stores-space-teacher-students';
import { ListComponent } from './containers/list/list.component';
import { studentsRoutes } from './lib.routes';
import { StudentListComponent } from './components/student-list/student-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    ClientPortalStoresSpaceTeacherStudentsModule,
    RouterModule.forChild(studentsRoutes),
  ],
  declarations: [ListComponent, StudentListComponent],
})
export class SpaceTeacherStudentsModule {}
