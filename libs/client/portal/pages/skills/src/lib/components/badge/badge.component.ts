import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input() color = '#000000';
}
