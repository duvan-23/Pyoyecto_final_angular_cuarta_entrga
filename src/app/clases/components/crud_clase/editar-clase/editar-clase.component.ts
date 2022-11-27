import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-editar-clase',
  templateUrl: './editar-clase.component.html',
  styleUrls: ['./editar-clase.component.css']
})
export class EditarClaseComponent implements OnInit, AfterViewInit {
  dataClase=this.data;
  formularioClase: FormGroup;
  comision_read: boolean=true;
  cursos$!:  Observable<Curso[]>;
  cursos!: Curso[];
  constructor(
    public dialogRef: MatDialogRef<EditarClaseComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private cursoService: CursosService
    ) {
    this.formularioClase = fb.group({
      nombre: new FormControl('',[Validators.required]),
      comision: new FormControl('',[Validators.required]),
      profesor: new FormControl('',[Validators.required]),
      inscripcionAbierta: new FormControl('',[]),
      fechaInicio: new FormControl('',[Validators.required]),
      fechaFinal: new FormControl('',[Validators.required]),
      id:new FormControl('',[Validators.required]),
      imagen:new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    this.cursos$ = this.cursoService.obtenerCursos();
    this.cursos$.subscribe((data)=>{
      this.cursos=data.filter(val => val.inscripcionAbierta === true).map(data => data);
    });
  }

  ngAfterViewInit(): void{
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  guardar(){
    this.dialogRef.close(this.formularioClase.value);
  }

}
