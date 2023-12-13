import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, interval, startWith } from 'rxjs';
import { FormatTimePipe } from '../pipes/format-time.pipe';

@Component({
  selector: 'klazzroom-space-portal-dashboard-widgets-clock',
  standalone: true,
  imports: [CommonModule, FormatTimePipe],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPortalSpaceDashboardWidgetsClockWidgetComponent
  implements OnInit, OnDestroy
{
  private timeSubscription!: Subscription;
  time!: Date;

  minutes = 0;
  hours = 0;
  seconds = 0;
  day = '';
  numberDay = 0;
  month = '';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.timeSubscription = interval(1000)
      .pipe(startWith(null))
      .subscribe(() => {
        this.updateTime();
      });
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  private updateTime(): void {
    this.time = new Date();

    this.hours = this.time.getHours();
    this.minutes = this.time.getMinutes();
    this.seconds = this.time.getSeconds();

    this.day = this.time.toLocaleString('fr-FR', { weekday: 'long' });
    this.numberDay = this.time.getDate();
    this.month = this.time.toLocaleString('fr-FR', { month: 'long' });

    this.changeDetectorRef.detectChanges();
  }
}
