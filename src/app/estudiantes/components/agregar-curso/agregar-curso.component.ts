import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.css']
})
export class AgregarCursoComponent implements OnInit {

  formularioEstudianteCurso: FormGroup;
  dataEstudiante=this.data;
  cursos$!:  Observable<Curso[]>;
  cursos2!: Curso[];
  constructor(
    public dialogRef: MatDialogRef<AgregarCursoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private cursoService: CursosService,
    ) {
    this.formularioEstudianteCurso = fb.group({
      id: new FormControl('',[Validators.required]),
      nombre_curso: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.cursos$ = this.cursoService.obtenerCursos();
    this.cursos$.subscribe((data)=>{
      this.cursos2=data.filter(val => val.inscripcionAbierta === true).map(data => data);
    });
  }
  guardar(){
    this.dialogRef.close(this.formularioEstudianteCurso.value);
  }
}
