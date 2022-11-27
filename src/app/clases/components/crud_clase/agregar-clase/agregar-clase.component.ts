import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-agregar-clase',
  templateUrl: './agregar-clase.component.html',
  styleUrls: ['./agregar-clase.component.css']
})
export class AgregarClaseComponent implements OnInit {

  formularioClase: FormGroup;
  cursos$!:  Observable<Curso[]>;
  cursos!: Curso[];
  constructor(
    public dialogRef: MatDialogRef<AgregarClaseComponent>,
    private fb: FormBuilder,
    private cursoService: CursosService
    ) {
    this.formularioClase = fb.group({
      nombre: new FormControl('',[Validators.required]),
      comision: new FormControl('',[Validators.required]),
      profesor: new FormControl('',[Validators.required]),
      fechaInicio: new FormControl('',[Validators.required]),
      fechaFinal: new FormControl('',[Validators.required]),
      inscripcionAbierta: new FormControl('',[]),
    });
  }

  ngOnInit(): void {
    this.cursos$ = this.cursoService.obtenerCursos();
    this.cursos$.subscribe((data)=>{
      this.cursos=data.filter(val => val.inscripcionAbierta === true).map(data => data);
    });
  }

  guardar(){
    this.dialogRef.close(this.formularioClase.value);
  }

}
