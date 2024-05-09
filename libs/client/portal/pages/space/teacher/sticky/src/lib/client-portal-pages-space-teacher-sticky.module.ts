import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clientPortalPagesSpaceTeacherStickyRoutes } from './lib.routes';
import { ListComponent } from './containers/list/list.component';
import { EditorComponent } from './containers/editor/editor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientPortalPagesSpaceTeacherStickyRoutes),
  ],
  declarations: [ListComponent, EditorComponent],
})
export class ClientPortalPagesSpaceTeacherStickyModule {}
