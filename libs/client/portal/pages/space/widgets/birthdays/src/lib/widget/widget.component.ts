import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpaceTeacherStudentsSelectors } from '@klazzroom/client-portal-stores-space-teacher-students';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'klazzroom-client-portal-space-dashboard-widgets-birthdays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPortalSpaceDashboardWidgetsBirthdaysWidgetComponent {
  students$!: Observable<any[]>;
  empty$!: Observable<boolean>;

  constructor(private store: Store) {
    this.students$ = this.store
      .select(SpaceTeacherStudentsSelectors.selectAll)
      .pipe(
        map((students) => {
          const today = new Date();
          const month = today.getMonth();
          return students.filter((student) => {
            const birthday = new Date(student.birthday);
            return birthday.getMonth() === month;
          }).sort((a, b) => {
            const birthdayA = new Date(a.birthday);
            const birthdayB = new Date(b.birthday);
            return birthdayA.getDate() - birthdayB.getDate();
          });
        })
      );

      this.empty$ = this.students$.pipe(map((students) => students.length === 0));
  }
}
