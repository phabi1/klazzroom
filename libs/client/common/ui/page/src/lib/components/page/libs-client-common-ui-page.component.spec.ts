import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientCommonUiPageComponent } from './libs-client-common-ui-page.component';

describe('LibsClientCommonUiPageComponent', () => {
  let component: LibsClientCommonUiPageComponent;
  let fixture: ComponentFixture<LibsClientCommonUiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientCommonUiPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibsClientCommonUiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
