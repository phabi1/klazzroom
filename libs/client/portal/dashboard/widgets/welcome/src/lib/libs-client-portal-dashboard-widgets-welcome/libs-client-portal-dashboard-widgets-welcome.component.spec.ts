import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalDashboardWidgetsWelcomeComponent } from './libs-client-portal-dashboard-widgets-welcome.component';

describe('LibsClientPortalDashboardWidgetsWelcomeComponent', () => {
  let component: LibsClientPortalDashboardWidgetsWelcomeComponent;
  let fixture: ComponentFixture<LibsClientPortalDashboardWidgetsWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalDashboardWidgetsWelcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalDashboardWidgetsWelcomeComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
