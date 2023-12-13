import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPortalSpaceDashboardWidgetsBirthdaysWidgetComponent } from './widget.component';

describe('ClientPortalSpaceDashboardWidgetsBirthdaysComponent', () => {
  let component: ClientPortalSpaceDashboardWidgetsBirthdaysWidgetComponent;
  let fixture: ComponentFixture<ClientPortalSpaceDashboardWidgetsBirthdaysWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPortalSpaceDashboardWidgetsBirthdaysWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ClientPortalSpaceDashboardWidgetsBirthdaysWidgetComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
