import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalUiLayoutComponent } from './libs-client-portal-layout.component';

describe('LibsClientPortalLayoutComponent', () => {
  let component: LibsClientPortalUiLayoutComponent;
  let fixture: ComponentFixture<LibsClientPortalUiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalUiLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibsClientPortalUiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
