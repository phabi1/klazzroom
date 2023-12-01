import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientPortalStoresSpaceTeacherStudentsModule } from '@klazzroom/client-portal-stores-space-teacher-students';
import { ListComponent } from './containers/list/list.component';
import { studentsRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    ClientPortalStoresSpaceTeacherStudentsModule,
    RouterModule.forChild(studentsRoutes),
  ],
  declarations: [ListComponent],
})
export class StudentsModule {}
