import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { SessionService } from 'src/app/core/services/session.service';
import { EstudiantesService } from 'src/app/estudiantes/services/estudiantes.service';
import { Curso } from 'src/app/models/curso';
import { Estudiantes } from 'src/app/models/estudiantes';
import { Session } from 'src/app/models/sesion';
import { QuitarEstudianteComponent } from '../quitar-estudiante/quitar-estudiante.component';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  id!:number;
  curso_edi!:Estudiantes;
  index_edi!:number;
  curso$!: Observable<Curso>;
  estudiante$!: Observable<Estudiantes[]>;
  estudiante!: Estudiantes[];
  estudiante2!: Array<Estudiantes[]>;
  nombreCurso!: string;
  session$!:Observable<Session>;
  constructor(
    private activateRoute: ActivatedRoute,
    private cursoService: CursosService,
    private estudianteService: EstudiantesService,
    private dialog: MatDialog,private _snackBar: MatSnackBar,
    private router: Router,
    private sessionService: SessionService,

  ) { }

  ngOnInit(): void {
    this.session$ = this.sessionService.obtenerSession();
    this.activateRoute.paramMap.subscribe((parametros)=>{
      this.id= parseInt(parametros.get("id") || '0');
      this.curso$= this.cursoService.obtenerCurso(this.id);
    })
    this.estudiante$ = this.estudianteService.obtenerEstudiantes();

    this.estudiante$.subscribe((data)=>{
      this.estudiante2=[];

      this.cursoService.obtenerCurso(this.id).subscribe((data2)=>{

        this.nombreCurso=""+data2.nombre+" "+data2.comision;
        data.forEach((element,index) => {
          
          element.nombre_curso.forEach((element2) => {
            if(element2==this.nombreCurso){
              this.estudianteService.obtenerEstudiante(data[index].id).subscribe((data)=>{this.estudiante2.push(data)});
            }
          });
        });

      });
    })

  }
  quitarCurso(curso:string){
    let dialog =this.dialog.open(QuitarEstudianteComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: {estudiante:this.estudiante2}
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.id_estudiante){
        this.estudianteService.obtenerEstudiante(res.id_estudiante).subscribe((data) => {
          data.forEach(element => {
            let count=0;
            element.nombre_curso.forEach((element2,index) => {
              if(element2 ==curso && count==0){
                count++;
                this.curso_edi=element;
                this.index_edi=index;
              }
            });
          });
        });
        this.curso_edi.nombre_curso.splice(this.index_edi,1);
        this.estudiante$ = this.estudianteService.obtenerEstudiantes();

        this.estudiante$.subscribe((data)=>{
          this.estudiante2=[];

          this.cursoService.obtenerCurso(this.id).subscribe((data2)=>{

            this.nombreCurso=""+data2.nombre+" "+data2.comision;
            data.forEach((element,index) => {
              
              element.nombre_curso.forEach((element2) => {
                if(element2==this.nombreCurso){
                  this.estudianteService.obtenerEstudiante(data[index].id).subscribe((data)=>{this.estudiante2.push(data)});
                }
              });
            });

          });
        })
      }
    })
  }

}
