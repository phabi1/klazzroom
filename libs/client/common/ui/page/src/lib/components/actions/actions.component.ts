import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Action } from '../../models/action.model';

@Component({
  selector: 'lib-libs-client-common-ui-page-actions',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent {
  actions = input<Action[]>([]);
  primary = input<string>('');

  primaryAction = computed(() => {
    const actions = this.actions();
    if (!this.primary() && actions.length > 0) {
      return actions[0];
    }
    return actions.find((action) => action.name === this.primary());
  });
  secondaryActions = computed(() => {
    return this.actions().filter(
      (action) => action.name !== this.primaryAction()?.name
    );
  });
}
