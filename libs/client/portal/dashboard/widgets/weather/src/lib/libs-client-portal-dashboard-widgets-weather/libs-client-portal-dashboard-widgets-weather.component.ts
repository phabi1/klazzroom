import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-libs-client-portal-dashboard-widgets-weather',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './libs-client-portal-dashboard-widgets-weather.component.html',
  styleUrl: './libs-client-portal-dashboard-widgets-weather.component.css',
})
export class LibsClientPortalDashboardWidgetsWeatherComponent
  implements OnInit
{
  private readonly httpClient = inject(HttpClient);

  weather = signal<any>(null);
  temperature = signal(0);

  icon = computed(() => {
    if (this.weather() === null) {
      return 'help';
    }
    switch (this.weather()) {
      case 0:
        return 'sunny';
      case 1:
      case 2:
      case 3:
        return 'partly cloudy day';
      case 45:
      case 48:
        return 'foggy';
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return 'rainy';
      case 71:
      case 73:
      case 75:
      case 77:
      case 80:
      case 81:
      case 82:
        return 'thunderstorm';
      case 85:
      case 86:
        return 'snowy';
      case 95:
      case 96:
      case 99:
        return 'thunderstorm';
      default:
        return 'help';
    }
  });

  ngOnInit(): void {
    this.httpClient
      .get<{ current_weather: any }>(
        'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true'
      )
      .subscribe((data) => {
        this.weather.set(data.current_weather.weathercode);
        this.temperature.set(data.current_weather.temperature);
      });
  }
}
