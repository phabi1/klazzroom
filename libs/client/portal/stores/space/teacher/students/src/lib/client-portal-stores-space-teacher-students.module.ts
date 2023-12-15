import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromStudent from './reducers/student.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './effects/student.effects';
import { ContactEffects } from './effects/contact.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStudent.spaceTeacherStudentsFeatureKey,
      fromStudent.reducer
    ),
    EffectsModule.forFeature([StudentEffects, ContactEffects]),
  ],
})
export class ClientPortalStoresSpaceTeacherStudentsModule {}
