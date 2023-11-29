import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NavLink } from '../../interfaces/nav-link.interface';

@Component({
  selector: 'klazzroom-client-common-ui-navbar-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent {
  @Input() links: NavLink[] = [];
}
