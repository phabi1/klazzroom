import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { studentsRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(studentsRoutes)],
  declarations: [ListComponent],
})
export class StudentsModule {}
