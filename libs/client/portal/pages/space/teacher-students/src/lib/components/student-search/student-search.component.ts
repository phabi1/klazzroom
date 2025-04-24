import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector:
    'lib-libs-client-portal-pages-space-teacher-students-student-search',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './student-search.component.html',
  styleUrl: './student-search.component.css',
})
export class StudentSearchComponent {
  value = input<string>('');
  search = output<string>();
}
