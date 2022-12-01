import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { SessionService } from 'src/app/core/services/session.service';
import { Curso } from 'src/app/models/curso';
import { Session } from 'src/app/models/sesion';
import { Tutor } from 'src/app/models/tutor';
import { agregarTutor, cargarTutores, eliminarTutor } from '../../state/tutores.actions';
import { TutorState } from '../../state/tutores.reducer';
import { selectTutores } from '../../state/tutores.selectors';
import { EditarTutorComponent } from '../editar-tutor/editar-tutor.component';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  cursos$!:  Observable<Curso[]>;
  cursoSeleccionado!: Curso;
  nombreTutor!: string;
  correoTutor!: string;
  dataSource!:MatTableDataSource<Tutor>;
  columnas: string[] = ['id', 'curso', 'tutor','correo', 'acciones'];
  session$!:Observable<Session>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private storeTutores: Store<TutorState>,
    private cursoService: CursosService,
    private sessionService: SessionService,
    private dialog: MatDialog
  ) {
    this.storeTutores.dispatch(cargarTutores());
   }

  ngOnInit(): void {

    this.cursos$ = this.cursoService.obtenerCursos();
    this.storeTutores.select(selectTutores).subscribe((tutores: Tutor[])=>{
      this.dataSource= new MatTableDataSource<Tutor>(tutores);
      this.dataSource.paginator = this.paginator;
    });
    this.session$ = this.sessionService.obtenerSession();
  }

  inscribir(curso: Curso,nombre:string,correo:string){
    const tutor: Tutor ={
      id:0,
      nombre: nombre,
      correo: correo,
      curso: curso
    }
    this.storeTutores.dispatch(agregarTutor({tutor}));
    this.dataSource.paginator = this.paginator;
  }

  editar(tutor:Tutor){
    this.dialog.open(EditarTutorComponent,{
      width: '300px',
      data: tutor
    })
  }
  eliminar(tutor:Tutor){
    this.storeTutores.dispatch(eliminarTutor({tutor}));
    this.dataSource.paginator = this.paginator;
  }
}
