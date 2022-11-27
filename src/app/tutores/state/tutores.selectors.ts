import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTutores from './tutores.reducer';

export const selectTutoresState = createFeatureSelector<fromTutores.TutorState>(
  fromTutores.tutoresFeatureKey
);

export const selectTutoresCargando = createSelector(
  selectTutoresState,
  (state) =>state.cargando
)

export const selectTutores = createSelector(
  selectTutoresState,
  (state) =>state.tutores
)
