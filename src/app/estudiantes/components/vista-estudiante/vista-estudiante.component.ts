import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { Estudiantes } from 'src/app/models/estudiantes';
import { Session } from 'src/app/models/sesion';
import { EstudiantesService } from '../../services/estudiantes.service';
import { AgregarCursoComponent } from '../agregar-curso/agregar-curso.component';
import { QuitarCursoComponent } from '../quitar-curso/quitar-curso.component';

@Component({
  selector: 'app-vista-estudiante',
  templateUrl: './vista-estudiante.component.html',
  styleUrls: ['./vista-estudiante.component.css']
})
export class VistaEstudianteComponent implements OnInit {

  id!:number;
  curso_edi!:Estudiantes;
  index_edi!:number;
  listaEstudiantes$!: Observable<Estudiantes[]>;
  session$!:Observable<Session>;
  constructor(
    private activateRoute: ActivatedRoute,
    private estudianteService: EstudiantesService,
    private dialog: MatDialog,private _snackBar: MatSnackBar,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.session$ = this.sessionService.obtenerSession();
    this.activateRoute.paramMap.subscribe((parametros)=>{
      this.id= parseInt(parametros.get("id") || '0');
      this.listaEstudiantes$ = this.estudianteService.obtenerEstudiante(this.id);
    })
  }

  agregarCurso(id:number){
    let dialog =this.dialog.open(AgregarCursoComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: {id:id}
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.nombre_curso){
        this.estudianteService.agregarEstudianteCurso(id,res.nombre_curso);
        this._snackBar.open(`Agrego el curso ${res.nombre_curso} Exitosamente`, "Cerrar", {
          duration: 3000
        });
        this.router.navigate(['estudiantes/vista',{id:id}]);
      }
    })
  }
  quitarCurso(id:number){
    let dialog =this.dialog.open(QuitarCursoComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: {id:id}
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.nombre_curso){
        let curso_edit;
        let index_edit;
        this.estudianteService.obtenerEstudiante(this.id).subscribe((data) => {
          data.forEach(element => {
            let count=0;
            element.nombre_curso.forEach((element2,index) => {
              if(element2 ==res.nombre_curso && count==0){
                count++;
                this.curso_edi=element;
                this.index_edi=index;
                // curso_edit.nombre_curso.splice(index,1);
                
                // this.listaEstudiantes.splice(indice, 1,element);
                // this.estudiantesSubject.next(this.listaEstudiantes);
              }
            });
          });
        });
        this.curso_edi.nombre_curso.splice(this.index_edi,1);
        this.router.navigate(['estudiantes/vista',{id:id}]);
      }
    })
  }

}
