import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormComponent as DomainFormComponent } from './containers/domains/form/form.component';
import { ListComponent as DomainListComponent } from './containers/domains/list/list.component';
import { FormComponent } from './containers/items/form/form.component';
import { ListComponent } from './containers/items/list/list.component';
import { clientPortalPagesSkillsRoutes } from './lib.routes';
import { MatIconModule } from '@angular/material/icon';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  imports: [
    CommonModule,
    FormlyModule,
    FormlyMaterialModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    RouterModule.forChild(clientPortalPagesSkillsRoutes),
  ],
  declarations: [
    DomainListComponent,
    DomainFormComponent,
    ListComponent,
    FormComponent,
    BadgeComponent,
  ],
})
export class ClientPortalPagesSkillsModule {}
