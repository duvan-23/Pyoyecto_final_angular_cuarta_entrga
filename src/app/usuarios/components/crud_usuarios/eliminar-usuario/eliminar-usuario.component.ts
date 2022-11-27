import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit {

  formularioUsuarioEliminar: FormGroup;
  dataUsuario=this.data;
  constructor(
    public dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.formularioUsuarioEliminar = fb.group({
      id:new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  eliminar(){
    this.dialogRef.close(this.formularioUsuarioEliminar.value);
  }

}
