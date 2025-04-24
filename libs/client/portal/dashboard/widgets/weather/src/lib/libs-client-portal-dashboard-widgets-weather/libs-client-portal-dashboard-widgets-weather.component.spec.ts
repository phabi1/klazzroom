import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalDashboardWidgetsWeatherComponent } from './libs-client-portal-dashboard-widgets-weather.component';

describe('LibsClientPortalDashboardWidgetsWeatherComponent', () => {
  let component: LibsClientPortalDashboardWidgetsWeatherComponent;
  let fixture: ComponentFixture<LibsClientPortalDashboardWidgetsWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalDashboardWidgetsWeatherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalDashboardWidgetsWeatherComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
