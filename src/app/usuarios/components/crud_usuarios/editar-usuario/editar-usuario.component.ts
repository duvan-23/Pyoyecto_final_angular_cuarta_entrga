import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  formularioEditarUsuario: FormGroup;
  dataUsuario=this.data;
  // cursos: Usuario[]=cursos;
  // cursos2: Usuario[]=this.cursos.filter(val => val.inscripcionAbierta === true).map(data => data);
  constructor(
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.formularioEditarUsuario = fb.group({
      usuario: new FormControl('',[Validators.required]),
      admin: new FormControl(''),
      superAdmin: new FormControl(''),
      id:new FormControl('',[Validators.required]),
      contrasena: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    this.dialogRef.close(this.formularioEditarUsuario.value);
  }

}
