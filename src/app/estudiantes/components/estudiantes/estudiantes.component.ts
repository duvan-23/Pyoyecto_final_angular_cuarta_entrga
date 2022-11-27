import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { estudiantes } from 'src/app/datos/estudiantes';
import { Estudiantes } from 'src/app/models/estudiantes';
import {MatPaginator} from '@angular/material/paginator';
import { map, Observable, tap } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { AgregarEstudiantesComponent } from '../crud_estudiantes/agregar-estudiantes/agregar-estudiantes.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditarEstudiantesComponent } from '../crud_estudiantes/editar-estudiantes/editar-estudiantes.component';
import { EliminarEstudiantesComponent } from '../crud_estudiantes/eliminar-estudiantes/eliminar-estudiantes.component';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Session } from 'src/app/models/sesion';
import { SessionService } from 'src/app/core/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit, AfterViewInit  {
  session$!:Observable<Session>;
  listaEstudiantes$!: Observable<Estudiantes[]>;
  estudiante_edit!: any;
  columnas: string[] = ['id','nombre','correo','edad','curso','acciones'];
  dataSource!: MatTableDataSource<Estudiantes>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private estudianteService: EstudiantesService,
    private dialog: MatDialog,private _snackBar: MatSnackBar,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listaEstudiantes$ = this.estudianteService.obtenerEstudiantes();
    this.listaEstudiantes$.subscribe((data)=>{
        this.dataSource=new MatTableDataSource<Estudiantes>(data);
    });
    this.session$ = this.sessionService.obtenerSession();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filtrarNombre(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate= function(estudiante: Estudiantes, filtro: string){
      return estudiante.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||estudiante.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    };
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  filtrarCorreo(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate= function(estudiante: Estudiantes, filtro: string){
      return estudiante.correo.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    };
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  agregarEstudiante(){
    let dialog =this.dialog.open(AgregarEstudiantesComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container'
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.nombre){
        this.estudianteService.agregarEstudiante({
          ...res,
          id: this.estudianteService.obtenerId()
        });
        this.dataSource.paginator = this.paginator;
        this._snackBar.open(`Agrego el estudiante ${res.nombre} ${res.apellido} Exitosamente`, "Cerrar", {
          duration: 3000
        });
      }
    })
  }
  editarEstudiante(id:number){
    let estudiante;
    this.estudianteService.obtenerEstudiante(id).subscribe((data)=>{
      estudiante=data['0'];
    });
    let dialog =this.dialog.open(EditarEstudiantesComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: estudiante
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.nombre){
        this.estudianteService.editarEstudiante(res);
        this.dataSource.paginator = this.paginator;
        this._snackBar.open(`Edito el estudiante ${res.nombre} ${res.apellido} Exitosamente`, "Cerrar", {
          duration: 3000
        });
      }
    })
  }
  verEstudiante(id:number){
    this.router.navigate(['estudiantes/vista',{id:id}])
  }
  eliminarEstudiante(id:number){
    this.estudianteService.obtenerEstudiante(id).subscribe((data)=>{
      this.estudiante_edit=data['0'];
    });
    let dialog =this.dialog.open(EliminarEstudiantesComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: this.estudiante_edit
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.id){
        this._snackBar.open(`Elimino el estudiante ${this.estudiante_edit.nombre} ${this.estudiante_edit.apellido} Exitosamente`, "Cerrar", {
          duration: 3000
        });
        this.estudianteService.eliminarEstudiante(res.id);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
}
