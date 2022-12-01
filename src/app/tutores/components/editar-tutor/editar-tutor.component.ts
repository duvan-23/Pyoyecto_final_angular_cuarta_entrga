import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { Curso } from 'src/app/models/curso';
import { Tutor } from 'src/app/models/tutor';
import { editarTutor } from '../../state/tutores.actions';
import { TutorState } from '../../state/tutores.reducer';

@Component({
  selector: 'app-editar-tutor',
  templateUrl: './editar-tutor.component.html',
  styleUrls: ['./editar-tutor.component.css']
})
export class EditarTutorComponent implements OnInit {
  cursos$!:  Observable<Curso[]>;
  tutorSelect!:any;
  formulario!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditarTutorComponent>,
    private cursoService: CursosService,
    @Inject(MAT_DIALOG_DATA) public tutor: Tutor,
    private storeTutores: Store<TutorState>
  ) {
    this.formulario = new FormGroup({
      curso: new FormControl('',[Validators.required]),
      tutor: new FormControl(this.tutor.nombre,[Validators.required]),
      correo: new FormControl(this.tutor.correo,[Validators.pattern('^[A-Za-z0-9]+@[A-Za-z]+\\.[A-Za-z]{2,3}$'), Validators.required]),
    })

  }

  ngOnInit(): void {
    this.tutorSelect=this.tutor.curso;
    this.cursos$ = this.cursoService.obtenerCursos();
  }

  cerrar(){
    this.dialogRef.close();
  }

  editar(){
    const i: Tutor = {
      id: this.tutor.id,
      nombre: this.formulario.value.tutor,
      correo: this.formulario.value.correo,
      curso: this.formulario.value.curso
    };
    this.storeTutores.dispatch(editarTutor({tutor: i}));
    this.dialogRef.close();
  }
}
