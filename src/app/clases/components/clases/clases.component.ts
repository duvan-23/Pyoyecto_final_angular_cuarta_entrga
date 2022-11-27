import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Observable, tap } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from 'src/app/models/curso';
import { AgregarClaseComponent } from '../crud_clase/agregar-clase/agregar-clase.component';
import { CursosService } from '../../services/cursos.service';
import { EditarClaseComponent } from '../crud_clase/editar-clase/editar-clase.component';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/sesion';
import { SessionService } from 'src/app/core/services/session.service';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {
  session$!:Observable<Session>;
  cursos$!:  Observable<Curso[]>;
  estudiante_edit!: any;
  curso!: Curso;
  id!: number;
  columnas: string[] = ['id','nombre','comision','profesor','fechaInicio','fechaFinal','inscripcionAbierta','acciones'];
  dataSource!: MatTableDataSource<Curso>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private cursoService: CursosService,
    private dialog: MatDialog,private _snackBar: MatSnackBar,
    private router: Router,
    private sessionService: SessionService
    ) { }

  ngOnInit(): void {
    this.cursos$ = this.cursoService.obtenerCursos();
    this.cursos$.subscribe((data)=>{
        this.dataSource=new MatTableDataSource<Curso>(data);
        this.dataSource.paginator = this.paginator;
    });
    this.session$ = this.sessionService.obtenerSession();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  filtrarNombre(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate= function(curso: Curso, filtro: string){
      return curso.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    };
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  filtrarComision(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate= function(curso: Curso, filtro: string){
      return curso.comision.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    };
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  agregarClase(){
    let dialog =this.dialog.open(AgregarClaseComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container'
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.nombre){
        res.inscripcionAbierta=res.inscripcionAbierta?res.inscripcionAbierta:false;
        res.imagen='https://parentesis.com/imagesPosts/coder00.jpg'
        this.cursoService.agregarCurso({
          ...res,
          id: 1
        });
        this.dataSource.paginator = this.paginator;
        this._snackBar.open(`Agrego la clase ${res.nombre} Exitosamente`, "Cerrar", {
          duration: 3000
        });
        this.router.navigate(['cursos/lista']);
      }
    })
  }

  editarCurso(id:number){
    // let curso;
    this.cursoService.obtenerCurso(id).subscribe((data)=>{
      this.curso=data;
      let dialog =this.dialog.open(EditarClaseComponent,{
        autoFocus: false,
        width: '550px',
        panelClass: 'custom-dialog-container',
        data: this.curso
      });
      dialog.beforeClosed().subscribe(res=>{
        if(res.nombre){
          this.id=res.id;
          this.cursoService.editarCurso(res);
          this.dataSource.paginator = this.paginator;
          this._snackBar.open(`Edito la clase ${res.nombre} Exitosamente`, "Cerrar", {
            duration: 3000
          });
          this.cursos$ = this.cursoService.obtenerCursos();
          this.cursos$.subscribe((data)=>{
              this.dataSource=new MatTableDataSource<Curso>(data);
              this.dataSource.paginator = this.paginator;
          });
          this.router.navigate(['clases']);
          // this.router.navigate(['cursos/vista',{id:res.id}]);
        }
      })
    });
  }
  mostrarCurso(id:number){
    this.router.navigate(['cursos/vista',{id:id}]);
  }
}
