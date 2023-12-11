import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpaceDashboardWidgetsClockWidgetComponent } from './widget.component';

describe('ClockComponent', () => {
  let component: SpaceDashboardWidgetsClockWidgetComponent;
  let fixture: ComponentFixture<SpaceDashboardWidgetsClockWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceDashboardWidgetsClockWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceDashboardWidgetsClockWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
