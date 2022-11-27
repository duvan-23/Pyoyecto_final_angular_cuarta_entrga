import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as TutoresActions from './tutores.actions';
import { TutoresService } from '../services/tutores.service';
import { Tutor } from 'src/app/models/tutor';


@Injectable()
export class TutoresEffects {

  cargarTutores$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TutoresActions.cargarTutores),
      concatMap(() => this.tutores.obtenerTutores().pipe(
        map((i: Tutor[]) =>TutoresActions.TutoresCargados({tutor: i}))
      ))
    );
  });

  agregarTutores$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TutoresActions.agregarTutor),
      concatMap(({tutor}) => this.tutores.agregarTutores(tutor).pipe(
        map((i: Tutor) =>TutoresActions.cargarTutores())
      ))
    );
  });

  eliminarTutores$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TutoresActions.eliminarTutor),
      concatMap(({tutor}) => this.tutores.eliminarTutores(tutor).pipe(
        map((i: Tutor) =>TutoresActions.cargarTutores())
      ))
    );
  });

  editarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TutoresActions.editarTutor),
      concatMap(({tutor}) => this.tutores.editarTutores(tutor).pipe(
        map((i: Tutor) =>TutoresActions.cargarTutores())
      ))
    );
  });

  constructor(
    private actions$: Actions,
    private tutores: TutoresService
    ) {}
}
