import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSpaceDashboardWidgetsWelcomeComponent } from './client-space-dashboard-widgets-welcome.component';

describe('ClientSpaceDashboardWidgetsWelcomeComponent', () => {
  let component: ClientSpaceDashboardWidgetsWelcomeComponent;
  let fixture: ComponentFixture<ClientSpaceDashboardWidgetsWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSpaceDashboardWidgetsWelcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ClientSpaceDashboardWidgetsWelcomeComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
