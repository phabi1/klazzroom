import { CommonModule, NgComponentOutlet } from '@angular/common';
import {
  Component,
  effect,
  inject,
  signal,
  Type
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { sidebarStore } from '@klazzroom/libs-client-portal-stores-layout';
import { SidebarRegistryService } from '../../services/sidebar-registry.service';

@Component({
  selector: 'lib-libs-client-portal-ui-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgComponentOutlet, MatSidenavModule],
  templateUrl: './libs-client-portal-layout.component.html',
  styleUrl: './libs-client-portal-layout.component.css',
  providers: [
    sidebarStore,
    {
      provide: SidebarRegistryService,
      useFactory: () => {
        const service = new SidebarRegistryService();
        service.register(
          'default',
          import('@klazzroom/libs-client-portal-ui-sidebars-default').then(
            (m) => m.LibsClientPortalUiSidebarsDefaultComponent
          )
        );
        service.register(
          'space',
          import('@klazzroom/libs-client-portal-ui-sidebars-space').then(
            (m) => m.LibsClientPortalUiSidebarsSpaceComponent
          )
        );

        return service;
      },
    },
  ],
})
export class LibsClientPortalUiLayoutComponent {
  public readonly sidebarStore = inject(sidebarStore);
  public readonly sidebarRegistry = inject(SidebarRegistryService);

  public readonly sidebarCmp = signal<Type<Component> | null>(null);

  constructor() {
    effect(async () => {
      const name = this.sidebarStore.name();
      let cmp: Type<Component> | null = null;
      if (name && this.sidebarRegistry.has(name)) {
        cmp = await this.sidebarRegistry.resolve(name);
      }
      this.sidebarCmp.set(cmp);
    });
  }
}
