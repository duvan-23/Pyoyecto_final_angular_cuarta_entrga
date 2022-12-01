import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutoresRoutingModule } from './tutores-routing.module';
import { TutorComponent } from './components/tutor/tutor.component';
import { EffectsModule } from '@ngrx/effects';
import { TutoresEffects } from './state/tutores.effects';
import { reducer, tutoresFeatureKey } from './state/tutores.reducer';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { EditarTutorComponent } from './components/editar-tutor/editar-tutor.component';


@NgModule({
  declarations: [
    TutorComponent,
    EditarTutorComponent
  ],
  imports: [
    CommonModule,
    TutoresRoutingModule,
    SharedModule,
    StoreModule.forFeature(tutoresFeatureKey, reducer),
    EffectsModule.forFeature([TutoresEffects])
  ]
})
export class TutoresModule { }
