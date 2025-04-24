import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { NavGroupComponent } from '../components/nav-group/nav-group.component';
import { NavItemComponent } from '../components/nav-item/nav-item.component';

@Component({
  selector: 'lib-libs-client-common-ui-navigation',
  standalone: true,
  imports: [CommonModule, NavItemComponent, NavGroupComponent],
  templateUrl: './libs-client-common-ui-navigation.component.html',
  styleUrl: './libs-client-common-ui-navigation.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LibsClientCommonUiNavigationComponent {
  links = input.required<any[]>();
}
