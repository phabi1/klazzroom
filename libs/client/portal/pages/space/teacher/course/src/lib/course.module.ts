import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { courseRoutes } from './lib.routes';
import { PageComponent } from './containers/page/page.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormlyModule,
    FormlyMaterialModule,
    MatButtonModule,
    RouterModule.forChild(courseRoutes),
  ],
  declarations: [PageComponent],
})
export class CourseModule {}
