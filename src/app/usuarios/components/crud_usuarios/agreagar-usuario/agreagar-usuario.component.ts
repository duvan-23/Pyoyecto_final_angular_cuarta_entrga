import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-agreagar-usuario',
  templateUrl: './agreagar-usuario.component.html',
  styleUrls: ['./agreagar-usuario.component.css']
})
export class AgreagarUsuarioComponent implements OnInit {

  formularioUsuario: FormGroup;
  // cursos: Usuario[]=cursos;
  // cursos2: Usuario[]=this.cursos.filter(val => val.inscripcionAbierta === true).map(data => data);
  constructor(
    public dialogRef: MatDialogRef<AgreagarUsuarioComponent>,
    private fb: FormBuilder
    ) {
    this.formularioUsuario = fb.group({
      usuario: new FormControl('',[Validators.required]),
      admin: new FormControl(''),
      superAdmin: new FormControl(''),
      contrasena: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    this.dialogRef.close(this.formularioUsuario.value);
  }

}
