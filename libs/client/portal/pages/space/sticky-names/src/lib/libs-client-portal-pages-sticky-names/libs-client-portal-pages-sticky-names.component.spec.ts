import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalPagesStickyNamesComponent } from './libs-client-portal-pages-sticky-names.component';

describe('LibsClientPortalPagesStickyNamesComponent', () => {
  let component: LibsClientPortalPagesStickyNamesComponent;
  let fixture: ComponentFixture<LibsClientPortalPagesStickyNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalPagesStickyNamesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalPagesStickyNamesComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
