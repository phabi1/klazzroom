import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalDashboardWidgetsClockComponent } from './libs-client-portal-dashboard-widgets-clock.component';

describe('LibsClientPortalDashboardWidgetsClockComponent', () => {
  let component: LibsClientPortalDashboardWidgetsClockComponent;
  let fixture: ComponentFixture<LibsClientPortalDashboardWidgetsClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalDashboardWidgetsClockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalDashboardWidgetsClockComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
