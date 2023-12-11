import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, interval, startWith } from 'rxjs';

@Component({
  selector: 'klazzroom-space-dashboard-widget-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceDashboardWidgetsClockWidgetComponent
  implements OnInit, OnDestroy
{
  private timeSubscription!: Subscription;
  time!: Date;

  minutes = 0;
  hours = 0;
  seconds = 0;

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

    this.changeDetectorRef.detectChanges();
  }
}
