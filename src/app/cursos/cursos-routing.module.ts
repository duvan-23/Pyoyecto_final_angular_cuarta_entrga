import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './components/cursos/cursos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { VistaComponent } from './components/vista/vista.component';

const routes: Routes = [
  {path:'',component:InicioComponent,children:[
    {path:'lista',component: CursosComponent},
    {path:'vista',component: VistaComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
