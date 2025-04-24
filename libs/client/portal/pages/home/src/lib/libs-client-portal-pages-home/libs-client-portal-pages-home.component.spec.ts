import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalPagesHomeComponent } from './libs-client-portal-pages-home.component';

describe('LibsClientPortalPagesHomeComponent', () => {
  let component: LibsClientPortalPagesHomeComponent;
  let fixture: ComponentFixture<LibsClientPortalPagesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalPagesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibsClientPortalPagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
