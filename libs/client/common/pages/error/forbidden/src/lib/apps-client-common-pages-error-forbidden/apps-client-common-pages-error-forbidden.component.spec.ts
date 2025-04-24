import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppsClientCommonPagesErrorForbiddenComponent } from './apps-client-common-pages-error-forbidden.component';

describe('AppsClientCommonPagesErrorForbiddenComponent', () => {
  let component: AppsClientCommonPagesErrorForbiddenComponent;
  let fixture: ComponentFixture<AppsClientCommonPagesErrorForbiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsClientCommonPagesErrorForbiddenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AppsClientCommonPagesErrorForbiddenComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
