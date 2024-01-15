import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatars';
import { LAYOUT_SIDEBARS } from './constants/tokens';
import { LayoutComponent } from './containers/layout/layout.component';
import { SidebarService } from './services/sidebar.service';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    AvatarModule,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class ClientCommonUiLayoutModule {
  static forRoot(options: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sidebars: { name: string; component: Type<any> }[];
  }): ModuleWithProviders<ClientCommonUiLayoutModule> {
    return {
      ngModule: ClientCommonUiLayoutModule,
      providers: [
        { provide: LAYOUT_SIDEBARS, useValue: options.sidebars },
        SidebarService,
      ],
    };
  }
}
