import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibsClientPortalPagesSpaceSkillsComponent } from './libs-client-portal-pages-space-skills.component';

describe('LibsClientPortalPagesSpaceSkillsComponent', () => {
  let component: LibsClientPortalPagesSpaceSkillsComponent;
  let fixture: ComponentFixture<LibsClientPortalPagesSpaceSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibsClientPortalPagesSpaceSkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      LibsClientPortalPagesSpaceSkillsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
