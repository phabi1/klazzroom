import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Action } from '../../models/action.model';
import { ActionsComponent } from '../actions/actions.component';

@Component({
  selector: 'lib-libs-client-common-ui-page-header',
  standalone: true,
  imports: [CommonModule, ActionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = input<string>();
  subtitle = input<string>('');
  actions = input<Action[]>([]);
  primaryAction = input<string>('');
}
