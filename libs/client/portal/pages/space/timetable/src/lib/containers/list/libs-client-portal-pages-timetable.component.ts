import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibsClientCommonUiPageComponent } from '@klazzroom/libs-client-common-ui-page';
import { timetableStore } from '@klazzroom/libs-client-portal-stores-timetable';


@Component({
  selector: 'lib-libs-client-portal-pages-timetable-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LibsClientCommonUiPageComponent, ],
  templateUrl: './libs-client-portal-pages-timetable.component.html',
  styleUrl: './libs-client-portal-pages-timetable.component.css',
  providers: [timetableStore],
})
export class ListComponent {
  public readonly store = inject(timetableStore);
}
