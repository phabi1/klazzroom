import { Component, Input } from '@angular/core';
import { Student } from '@klazzroom/client-portal-stores-space-teacher-students';

@Component({
  selector: 'klazzroom-client-portal-pages-space-teacher-students-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  @Input() students: Student[] = [];
}
