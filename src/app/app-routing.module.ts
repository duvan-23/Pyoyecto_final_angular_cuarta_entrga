import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { AutenticacionGuard } from './core/guards/autenticacion.guard';


const routes: Routes = [
  {path:'inicio',component: InicioComponent, canActivate: [AutenticacionGuard]},
  {
    path:'estudiantes',
    loadChildren: () => import('./estudiantes/estudiantes.module').then((m)=> m.EstudiantesModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path:'clases',
    loadChildren: () => import('./clases/clases.module').then((m)=> m.ClasesModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path:'cursos',
    loadChildren: () => import('./cursos/cursos.module').then((m)=> m.CursosModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path:'tutores',
    loadChildren: () => import('./tutores/tutores.module').then((m)=> m.TutoresModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path:'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then((m)=> m.UsuariosModule),
    canActivate: [AutenticacionGuard]
  },
  {
    path:'login',
    loadChildren: () => import('./autenticacion/autenticacion.module').then((m)=> m.AutenticacionModule)
  },//quitar AutenticacionModule de app.module.ts
  {path:'', redirectTo:'inicio',pathMatch:'full'},
  {path:'**',  redirectTo:'inicio',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
