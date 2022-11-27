import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudiantesModule } from '../estudiantes/estudiantes.module';
import { CursosModule } from '../cursos/cursos.module';
import { ClasesModule } from '../clases/clases.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    InicioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    ToolbarComponent,
    NavbarComponent,
    InicioComponent,
    RouterModule,
  ]
})
export class CoreModule { }
