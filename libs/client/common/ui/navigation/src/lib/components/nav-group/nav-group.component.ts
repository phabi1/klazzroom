import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { NavLink } from '../../models/nav-link.model';
import { NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  selector: 'lib-libs-client-common-ui-navigation-nav-group',
  standalone: true,
  imports: [CommonModule, NavItemComponent],
  templateUrl: './nav-group.component.html',
  styleUrl: './nav-group.component.css',
})
export class NavGroupComponent {
  link = input.required<NavLink>();
}
