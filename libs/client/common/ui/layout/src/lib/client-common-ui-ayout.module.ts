import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './containers/layout/layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatSidenavModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class ClientCommonUiLayoutModule {}
