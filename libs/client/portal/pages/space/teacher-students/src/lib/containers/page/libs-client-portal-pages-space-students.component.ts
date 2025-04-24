import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TeacherStudentsStore } from '@klazzroom/libs-client-portal-stores-teacher-students';
import { StudentListComponent } from '../../components/student-list/student-list.component';
import { StudentSearchComponent } from '../../components/student-search/student-search.component';

@Component({
  selector: 'lib-libs-client-portal-pages-space-teacher-students-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    StudentListComponent,
    StudentSearchComponent,
],
  templateUrl: './libs-client-portal-pages-space-students.component.html',
  styleUrl: './libs-client-portal-pages-space-students.component.css',
  providers: [TeacherStudentsStore],
})
export class LibsClientPortalPagesSpaceStudentsComponent {
  public readonly store = inject(TeacherStudentsStore);
}
