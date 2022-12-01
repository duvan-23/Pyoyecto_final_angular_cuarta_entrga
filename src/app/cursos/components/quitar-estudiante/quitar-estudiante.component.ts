import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { EstudiantesService } from 'src/app/estudiantes/services/estudiantes.service';
import { Curso } from 'src/app/models/curso';
import { Estudiantes } from 'src/app/models/estudiantes';

@Component({
  selector: 'app-quitar-estudiante',
  templateUrl: './quitar-estudiante.component.html',
  styleUrls: ['./quitar-estudiante.component.css']
})
export class QuitarEstudianteComponent implements OnInit {

  formularioEstudianteCurso: FormGroup;
  dataEstudiante=this.data;
  cursos$!:  Observable<Curso[]>;
  estudiantes$!:  Observable<Estudiantes[]>;
  estudiante2!: Array<Estudiantes>;
  // cursos: Curso[]=cursos;
  cursos2!: Curso[];
  constructor(
    public dialogRef: MatDialogRef<QuitarEstudianteComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private cursoService: CursosService,
    private estudainteService: EstudiantesService,
    ) {
    this.formularioEstudianteCurso = fb.group({
      id_estudiante: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.estudiante2=[];
    this.dataEstudiante.estudiante.forEach((element:any)=> {
      this.estudiante2.push(element[0]);
    });
  }
  guardar(){
    this.dialogRef.close(this.formularioEstudianteCurso.value);
  }

}
