import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clientPortalPagesHolidaysRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientPortalPagesHolidaysRoutes),
  ],
})
export class ClientPortalPagesHolidaysModule {}
