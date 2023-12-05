import { Route } from '@angular/router';
import { selectStudentGuard } from '@klazzroom/client-portal-stores-space-teacher-students';
import { AddComponent } from './containers/add/add.component';
import { DetailsComponent } from './containers/details/details.component';
import { EditComponent } from './containers/edit/edit.component';
import { EmptyComponent } from './containers/empty/empty.component';
import { ListComponent } from './containers/list/list.component';
import { RemoveComponent } from './containers/remove/remove.component';

export const studentsRoutes: Route[] = [
  {
    path: '',
    component: ListComponent,
    children: [
      { path: '', component: EmptyComponent },
      { path: 'add', component: AddComponent},
      {
        path: ':student',
        canActivate: [selectStudentGuard],
        children: [
          { path: '', component: DetailsComponent },
          { path: 'edit', component: EditComponent },
          { path: 'delete', component: RemoveComponent },
        ],
      },
    ],
  },
];
