import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromStudent from './reducers/student.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(fromStudent.spaceTeacherStudentsFeatureKey, fromStudent.reducer)],
})
export class ClientPortalStoresSpaceTeacherStudentsModule {}
