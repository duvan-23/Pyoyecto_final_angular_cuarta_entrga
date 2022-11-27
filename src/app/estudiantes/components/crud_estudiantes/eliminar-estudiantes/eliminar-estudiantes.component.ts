import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-estudiantes',
  templateUrl: './eliminar-estudiantes.component.html',
  styleUrls: ['./eliminar-estudiantes.component.css']
})
export class EliminarEstudiantesComponent implements OnInit {

  formularioEstudianteEliminarr: FormGroup;
  dataEstudiante=this.data;
  constructor(
    public dialogRef: MatDialogRef<EliminarEstudiantesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.formularioEstudianteEliminarr = fb.group({
      id:new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  eliminar(){
    this.dialogRef.close(this.formularioEstudianteEliminarr.value);
  }

}
