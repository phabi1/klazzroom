import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalPagesCalendarDaysComponent } from './libs-client-portal-pages-calendar-days.component';

describe('LibsClientPortalPagesCalendarDaysComponent', () => {
  let component: LibsClientPortalPagesCalendarDaysComponent;
  let fixture: ComponentFixture<LibsClientPortalPagesCalendarDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalPagesCalendarDaysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalPagesCalendarDaysComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
