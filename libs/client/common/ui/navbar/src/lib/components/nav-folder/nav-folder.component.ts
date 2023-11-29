import { Component, Input } from '@angular/core';
import { NavLink } from '../../interfaces/nav-link.interface';

@Component({
  selector: 'klazzroom-client-common-ui-navbar-nav-folder',
  templateUrl: './nav-folder.component.html',
  styleUrls: ['./nav-folder.component.css'],
})
export class NavFolderComponent {
  @Input() item!: NavLink;
}
