import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavFolderComponent } from './components/nav-folder/nav-folder.component';
import { NavGroupComponent } from './components/nav-group/nav-group.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    NavBarComponent,
    NavItemComponent,
    NavGroupComponent,
    NavFolderComponent,
  ],
  exports: [NavBarComponent],
})
export class ClientCommonUiNavbarModule {}
