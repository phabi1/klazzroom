import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalPagesSpaceStudentsComponent } from './libs-client-portal-pages-space-students.component';

describe('LibsClientPortalPagesSpaceStudentsComponent', () => {
  let component: LibsClientPortalPagesSpaceStudentsComponent;
  let fixture: ComponentFixture<LibsClientPortalPagesSpaceStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalPagesSpaceStudentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalPagesSpaceStudentsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
