import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clientCommonPagesSpacesRoutes } from './lib.routes';
import { ListComponent } from './containers/list/list.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(clientCommonPagesSpacesRoutes),
  ],
  declarations: [ListComponent],
})
export class ClientPortalPagesSpacesModule {}
