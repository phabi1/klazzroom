import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalUiSidebarsDefaultComponent } from './libs-client-portal-ui-sidebars-default.component';

describe('LibsClientPortalUiSidebarsDefaultComponent', () => {
  let component: LibsClientPortalUiSidebarsDefaultComponent;
  let fixture: ComponentFixture<LibsClientPortalUiSidebarsDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalUiSidebarsDefaultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalUiSidebarsDefaultComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
