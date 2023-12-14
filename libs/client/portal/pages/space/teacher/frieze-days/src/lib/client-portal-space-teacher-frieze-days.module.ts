import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { PageComponent } from './containers/page/page.component';
import { clientPortalSpaceTeacherFriezeDaysRoutes } from './lib.routes';
import { FriezeDaysService } from './services/frieze-days.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    MatButtonModule,
    RouterModule.forChild(clientPortalSpaceTeacherFriezeDaysRoutes),
  ],
  declarations: [PageComponent],
  providers: [FriezeDaysService],
})
export class ClientPortalSpaceTeacherFriezeDaysModule {}
