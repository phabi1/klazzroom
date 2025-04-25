import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalPagesSpaceCourseComponent } from './libs-client-portal-pages-space-course.component';

describe('LibsClientPortalPagesSpaceCourseComponent', () => {
  let component: LibsClientPortalPagesSpaceCourseComponent;
  let fixture: ComponentFixture<LibsClientPortalPagesSpaceCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalPagesSpaceCourseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalPagesSpaceCourseComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
