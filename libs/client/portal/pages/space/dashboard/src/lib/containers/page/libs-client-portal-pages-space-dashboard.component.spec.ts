import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalPagesSpaceDashboardComponent } from './libs-client-portal-pages-space-dashboard.component';

describe('LibsClientPortalPagesSpaceDashboardComponent', () => {
  let component: LibsClientPortalPagesSpaceDashboardComponent;
  let fixture: ComponentFixture<LibsClientPortalPagesSpaceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalPagesSpaceDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalPagesSpaceDashboardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
