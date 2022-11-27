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
    console.log(this.estudiante2);
    // this.cursos$ = this.cursoService.obtenerCursos();
    // this.cursos$.subscribe((data)=>{
    //   this.cursos2=data.filter(val => val.inscripcionAbierta === true).map(data => data);
    // });
    // this.estudiantes$= this.estudainteService.obtenerEstudiante(this.dataEstudiante.id);
    // this.estudiantes$.subscribe((data)=>{
    //   this.estudiante2=[];
    //   data.forEach((element) => {
    //     this.cursoService.obtenerCursos().subscribe((data2)=>{
    //       element.nombre_curso.forEach((element2)=>{
    //         data2.forEach((element3) => {
    //           let nombre =element3.nombre+" "+element3.comision;
    //           if(nombre == element2){
    //             this.estudiante2.push(element3);
    //           }
    //         });
    //       })

    //     });
    //   });
    // })
  }
  guardar(){
    this.dialogRef.close(this.formularioEstudianteCurso.value);
  }

}
