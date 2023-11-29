import { Component, Input } from '@angular/core';
import { NavLink } from '../../interfaces/nav-link.interface';

@Component({
  selector: 'klazzroom-client-common-ui-navbar-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.css'],
})
export class NavGroupComponent {
  @Input() item!: NavLink;
}
