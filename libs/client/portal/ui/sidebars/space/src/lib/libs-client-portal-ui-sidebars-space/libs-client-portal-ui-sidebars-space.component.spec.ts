import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalUiSidebarsSpaceComponent } from './libs-client-portal-ui-sidebars-space.component';

describe('LibsClientPortalUiSidebarsSpaceComponent', () => {
  let component: LibsClientPortalUiSidebarsSpaceComponent;
  let fixture: ComponentFixture<LibsClientPortalUiSidebarsSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalUiSidebarsSpaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibsClientPortalUiSidebarsSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
