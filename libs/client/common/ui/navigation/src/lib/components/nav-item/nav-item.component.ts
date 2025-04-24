import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../models/nav-link.model';

@Component({
  selector: 'lib-libs-client-common-ui-navigation-nav-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css',
})
export class NavItemComponent {
  link = input.required<NavLink>();
}
