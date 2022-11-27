import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminGuard } from '../core/guards/super-admin.guard';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'',component:UserComponent, canActivate: [SuperAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
