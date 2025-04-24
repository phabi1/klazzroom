import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibsClientCommonUiNavigationComponent } from '@klazzroom/libs-client-common-ui-navigation';
import { SpacesStore } from '@klazzroom/libs-client-portal-stores-space';
import { SidebarTypeDirective } from '@klazzroom/libs-client-portal-ui-layout';
import { NavLink } from 'libs/client/common/ui/navigation/src/lib/models/nav-link.model';

@Component({
  selector: 'lib-libs-client-portal-ui-sidebars-space',
  standalone: true,
  imports: [CommonModule, RouterLink, LibsClientCommonUiNavigationComponent],
  templateUrl: './libs-client-portal-ui-sidebars-space.component.html',
  styleUrl: './libs-client-portal-ui-sidebars-space.component.css',
})
export class LibsClientPortalUiSidebarsSpaceComponent
  extends SidebarTypeDirective
  implements OnInit
{
  public readonly spaceStore = inject(SpacesStore);
  public readonly httpClient = inject(HttpClient);

  public navigations = signal<Record<string, any[]>>({});

  public links = computed(() => {
    const space = this.spaceStore.currentSpace();
    const navigations = this.navigations();
    let links: any[] = [];
    if (space) {
      const navigation = navigations[space.kind];
      if (navigation) {
        links = this.buildNavigation(navigation, {
          spaceId: space.id,
        });
      }
    }
    return links;
  });

  ngOnInit(): void {
    this.httpClient.get<Record<string, any[]>>('/navigations.json').subscribe({
      next: (navigations) => {
        this.navigations.set(navigations);
      },
      error: (err) => {
        console.error('Error loading navigations:', err);
        this.navigations.set({});
      },
    });
  }

  private buildNavigation(
    navigation: NavLink[],
    variables: Record<string, any>
  ): NavLink[] {
    return navigation.map((link) => {
      return {
        ...link,
        to: link.to ? this.transformLink(link.to, variables) : undefined,
        children: link.children
          ? this.buildNavigation(link.children, variables)
          : undefined,
      };
    });
  }

  private transformLink(path: string, variables: Record<string, any>): string {
    return path.replace(/:(\w+)/gm, (_, key) => {
      const value = variables[key];
      if (value) {
        return value;
      }
      return key;
    });
  }
}
