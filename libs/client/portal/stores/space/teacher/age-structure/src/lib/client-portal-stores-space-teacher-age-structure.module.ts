import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSpaceTeacherAgeStructure from './reducers/space-teacher-age-structure.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SpaceTeacherAgeStructureEffects } from './effects/space-teacher-age-structure.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSpaceTeacherAgeStructure.spaceTeacherAgeStructureFeatureKey,
      fromSpaceTeacherAgeStructure.reducer
    ),
    EffectsModule.forFeature([SpaceTeacherAgeStructureEffects]),
  ],
})
export class ClientPortalStoresSpaceTeacherAgeStructureModule {}
