import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentItemComponent } from '../student-item/student-item.component';

@Component({
  selector: 'lib-libs-client-portal-pages-space-teacher-students-student-list',
  standalone: true,
  imports: [CommonModule, StudentItemComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  students = input.required<any[]>();
  loading = input.required<boolean>();

  onSelectStudent(student: any) {
    this.router.navigate(['./', student.id], {
      relativeTo: this.route,
    });
  }
}
