import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalPagesSpacesComponent } from './libs-client-portal-pages-spaces.component';

describe('LibsClientPortalPagesSpacesComponent', () => {
  let component: LibsClientPortalPagesSpacesComponent;
  let fixture: ComponentFixture<LibsClientPortalPagesSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalPagesSpacesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibsClientPortalPagesSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
