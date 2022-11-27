import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-editar-estudiantes',
  templateUrl: './editar-estudiantes.component.html',
  styleUrls: ['./editar-estudiantes.component.css']
})
export class EditarEstudiantesComponent implements OnInit {
  formularioEstudianteEditar: FormGroup;
  dataEstudiante=this.data;



  selectedOption:string =this.dataEstudiante.nombre_curso;
  constructor(
    public dialogRef: MatDialogRef<EditarEstudiantesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.formularioEstudianteEditar = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      correo: new FormControl('',[Validators.pattern('^[A-Za-z0-9]+@[A-Za-z]+\\.[A-Za-z]{2,3}$'), Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      edad: new FormControl('',[Validators.required]),
      id:new FormControl('',[Validators.required]),
      nombre_curso:new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    this.formularioEstudianteEditar.value.nombre_curso=this.selectedOption;
    this.dialogRef.close(this.formularioEstudianteEditar.value);
  }

  leer(){
    this.formularioEstudianteEditar.value.nombre_curso=this.selectedOption;
    return this.formularioEstudianteEditar.value;
  }

}
