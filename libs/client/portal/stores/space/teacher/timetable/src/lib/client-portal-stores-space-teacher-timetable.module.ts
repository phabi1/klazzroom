import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromTimetable from './reducers/timetable.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TimetableEffects } from './effects/timetable.effects';
@NgModule({
  imports: [
    StoreModule.forFeature(
      fromTimetable.spaceTeacherTimetablesFeatureKey,
      fromTimetable.reducer
    ),
    EffectsModule.forFeature([TimetableEffects]),
  ],
})
export class ClientPortalStoresSpaceTeacherTimetableModule {}
