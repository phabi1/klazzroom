import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-libs-client-portal-pages-space-teacher-students-student-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.css',
})
export class StudentItemComponent {
  student = input.required<any>();

  title = computed(() => {
    const student = this.student();
    return student.firstname + ' ' + student.lastname;
  });

  color = computed(() => {
    const student = this.student();
    switch (student.sex) {
      case 'Boy':
        return 'blue';
      case 'Girl':
        return 'pink';
      default:
        return 'grey';
    }
  });
}
