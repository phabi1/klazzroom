import { Component, Input } from '@angular/core';
import { NavLink } from '../../interfaces/nav-link.interface';

@Component({
  selector: 'klazzroom-client-common-ui-navbar-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css'],
})
export class NavItemComponent {
  @Input() item!: NavLink;
}
