import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { VistaEstudianteComponent } from './components/vista-estudiante/vista-estudiante.component';


const routes: Routes = [
  {path:'',children:[
    {path:'lista',component: EstudiantesComponent},
    {path:'vista',component: VistaEstudianteComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
