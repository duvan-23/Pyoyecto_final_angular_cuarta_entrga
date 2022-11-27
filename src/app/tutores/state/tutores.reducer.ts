import { Action, createReducer, on } from '@ngrx/store';
import { Tutor } from 'src/app/models/tutor';
import * as TutoresActions from './tutores.actions';

export const tutoresFeatureKey = 'tutores';

export interface TutorState {
  cargando: boolean;
  tutores: Tutor[];
}

export const initialState: TutorState = {
  cargando: false,
  tutores: []
};

export const reducer = createReducer(
  initialState,


  on(TutoresActions.cargarTutores, (state) => {
    return {...state,cargando:true}
  }),
  on(TutoresActions.TutoresCargados, (state, {tutor}) => {
    return {...state,cargando:false, tutores:tutor}
  }),
  on(TutoresActions.agregarTutor, (state, {tutor}) => {
    return state;
  }),
  on(TutoresActions.editarTutor, (state, {tutor}) => {
    return state;
  }),
  on(TutoresActions.eliminarTutor, (state, {tutor}) => {
    return state;
  })

);
