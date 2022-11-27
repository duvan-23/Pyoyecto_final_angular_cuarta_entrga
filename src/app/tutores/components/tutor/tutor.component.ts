import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { Curso } from 'src/app/models/curso';
import { Tutor } from 'src/app/models/tutor';
import { agregarTutor, cargarTutores, eliminarTutor } from '../../state/tutores.actions';
import { TutorState } from '../../state/tutores.reducer';
import { selectTutores } from '../../state/tutores.selectors';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  cursos$!:  Observable<Curso[]>;
  tutores$!:any;
  cursoSeleccionado!: Curso;
  nombreTutor!: string;
  correoTutor!: string;
  dataSource!:MatTableDataSource<Tutor>;
  columnas: string[] = ['id', 'curso', 'tutor', 'acciones'];
  constructor(
    private storeTutores: Store<TutorState>,
    private cursoService: CursosService,
  ) {
    this.storeTutores.dispatch(cargarTutores());
   }

  ngOnInit(): void {

    this.cursos$ = this.cursoService.obtenerCursos();
    // this.tutores$= this.storeTutores.select(selectTutores);
    this.storeTutores.select(selectTutores).subscribe((tutores: Tutor[])=>{
      this.dataSource= new MatTableDataSource<Tutor>(tutores);
    });
  }

  inscribir(curso: Curso,nombre:string,correo:string){
    // if(this.usuarioActivo){
      const tutor: Tutor ={
        id:0,
        nombre: nombre,
        correo: correo,
        curso: curso
      }
      this.storeTutores.dispatch(agregarTutor({tutor}));
    // }
  }

  editar(tutor:Tutor){
    console.log(tutor);
  }
  eliminar(tutor:Tutor){
    this.storeTutores.dispatch(eliminarTutor({tutor}));
  }
}
