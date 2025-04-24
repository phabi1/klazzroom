import { Route } from '@angular/router';
import { EmptyComponent } from './containers/empty/empty.component';
import { LibsClientPortalPagesSpaceStudentsComponent } from './containers/page/libs-client-portal-pages-space-students.component';
import { FormComponent } from './containers/form/form.component';

export const libsClientPortalPagesSpaceStudentsRoutes: Route[] = [
  {
    path: '',
    component: LibsClientPortalPagesSpaceStudentsComponent,
    children: [
      {
        path: '',
        component: EmptyComponent,
      },
      {
        path: 'add',
        component: FormComponent,
      },
      {
        path: ':studentId',
        component: FormComponent,
      },
    ],
  },
];
