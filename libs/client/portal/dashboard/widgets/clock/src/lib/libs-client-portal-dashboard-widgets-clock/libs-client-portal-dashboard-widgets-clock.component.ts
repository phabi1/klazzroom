import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatZeroPipe } from '../pipes/formatZero.pipe';

@Component({
  selector: 'lib-libs-client-portal-dashboard-widgets-clock',
  standalone: true,
  imports: [CommonModule, FormatZeroPipe],
  templateUrl: './libs-client-portal-dashboard-widgets-clock.component.html',
  styleUrl: './libs-client-portal-dashboard-widgets-clock.component.css',
})
export class LibsClientPortalDashboardWidgetsClockComponent
  implements OnInit, OnDestroy
{
  date = signal(new Date());
  interval: any;

  hours = computed<number>(() => {
    return this.date().getHours();
  });

  minutes = computed<number>(() => {
    return this.date().getMinutes();
  });

  seconds = computed<number>(() => {
    return this.date().getSeconds();
  });

  ngOnInit() {
    this.interval = setInterval(() => {
      this.date.set(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
