import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientCommonUiNavigationComponent } from './libs-client-common-ui-navigation.component';

describe('LibsClientCommonUiNavigationComponent', () => {
  let component: LibsClientCommonUiNavigationComponent;
  let fixture: ComponentFixture<LibsClientCommonUiNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientCommonUiNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibsClientCommonUiNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
