import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesComponent } from './components/clases/clases.component';
import { SharedModule } from '../shared/shared.module';
import { AgregarClaseComponent } from './components/crud_clase/agregar-clase/agregar-clase.component';
import { EditarClaseComponent } from './components/crud_clase/editar-clase/editar-clase.component';
import { ClasesRoutingModule } from './clases-routing.module';



@NgModule({
  declarations: [
    ClasesComponent,
    AgregarClaseComponent,
    EditarClaseComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClasesRoutingModule
  ],
  exports: [
    ClasesComponent,
    AgregarClaseComponent,
  ]
})
export class ClasesModule { }
