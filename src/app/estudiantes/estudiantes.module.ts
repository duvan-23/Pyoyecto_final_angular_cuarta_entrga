import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AgregarEstudiantesComponent } from './components/crud_estudiantes/agregar-estudiantes/agregar-estudiantes.component';
import { EditarEstudiantesComponent } from './components/crud_estudiantes/editar-estudiantes/editar-estudiantes.component';
import { EliminarEstudiantesComponent } from './components/crud_estudiantes/eliminar-estudiantes/eliminar-estudiantes.component';
import { SharedModule } from '../shared/shared.module';
import { EstudiantesRoutingModule } from './estudiantes-router.module';
import { VistaEstudianteComponent } from './components/vista-estudiante/vista-estudiante.component';
import { AgregarCursoComponent } from './components/agregar-curso/agregar-curso.component';
import { QuitarCursoComponent } from './components/quitar-curso/quitar-curso.component';



@NgModule({
  declarations: [
    EstudiantesComponent,
    AgregarEstudiantesComponent,
    EditarEstudiantesComponent,
    EliminarEstudiantesComponent,
    VistaEstudianteComponent,
    AgregarCursoComponent,
    QuitarCursoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EstudiantesRoutingModule
  ],
  exports: [
    EstudiantesComponent,
    AgregarEstudiantesComponent,
    EditarEstudiantesComponent,
    EliminarEstudiantesComponent,
    EstudiantesRoutingModule,
    VistaEstudianteComponent,
  ]
})
export class EstudiantesModule { }
