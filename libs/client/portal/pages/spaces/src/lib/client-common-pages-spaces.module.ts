import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clientCommonPagesSpacesRoutes } from './lib.routes';
import { ListComponent } from './containers/list/list.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(clientCommonPagesSpacesRoutes)],
  declarations: [ListComponent],
})
export class ClientCommonPagesSpacesModule {}
