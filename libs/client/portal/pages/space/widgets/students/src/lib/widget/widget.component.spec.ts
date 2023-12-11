import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSpaceDashboardWidgetsStudentsComponent } from './widget.component';

describe('ClientSpaceDashboardWidgetsStudentsComponent', () => {
  let component: ClientSpaceDashboardWidgetsStudentsComponent;
  let fixture: ComponentFixture<ClientSpaceDashboardWidgetsStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSpaceDashboardWidgetsStudentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ClientSpaceDashboardWidgetsStudentsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
