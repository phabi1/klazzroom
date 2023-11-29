import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSpace from './reducers/space.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SpaceEffects } from './effects/space.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(fromSpace.spacesFeatureKey, fromSpace.reducer), EffectsModule.forFeature([SpaceEffects])],
})
export class ClientCommonStoresSpacesModule {}
