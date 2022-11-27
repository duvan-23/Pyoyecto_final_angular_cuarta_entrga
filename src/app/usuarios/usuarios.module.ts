import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { AgreagarUsuarioComponent } from './components/crud_usuarios/agreagar-usuario/agreagar-usuario.component';
import { EditarUsuarioComponent } from './components/crud_usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './components/crud_usuarios/eliminar-usuario/eliminar-usuario.component';


@NgModule({
  declarations: [
    UserComponent,
    AgreagarUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
