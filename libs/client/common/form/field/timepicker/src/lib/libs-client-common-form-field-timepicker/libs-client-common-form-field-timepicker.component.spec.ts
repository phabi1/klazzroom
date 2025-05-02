import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientCommonFormFieldTimepickerComponent } from './libs-client-common-form-field-timepicker.component';

describe('LibsClientCommonFormFieldTimepickerComponent', () => {
  let component: LibsClientCommonFormFieldTimepickerComponent;
  let fixture: ComponentFixture<LibsClientCommonFormFieldTimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientCommonFormFieldTimepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientCommonFormFieldTimepickerComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
