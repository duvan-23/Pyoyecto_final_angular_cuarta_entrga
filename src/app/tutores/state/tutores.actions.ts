import { createAction, props } from '@ngrx/store';
import { Tutor } from 'src/app/models/tutor';

export const cargarTutores = createAction(
  '[Tutores] Cargar Tutores'
);

export const TutoresCargados = createAction(
  '[Tutores] Tutores Cargados',
  props<{tutor: Tutor[]}>()
);

export const agregarTutor= createAction(
  '[Tutores] Agregar Inscripcion',
  props<{tutor: Tutor}>()
);

export const editarTutor= createAction(
  '[Tutores] Editar Inscripcion',
  props<{tutor: Tutor}>()
);

export const eliminarTutor= createAction(
  '[Tutores] Eliminar Inscripcion',
  props<{tutor: Tutor}>()
);
