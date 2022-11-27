import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { EditarEstudiantesComponent } from './editar-estudiantes.component';

fdescribe('EditarEstudiantesComponent', () => {
  let component: EditarEstudiantesComponent;
  let fixture: ComponentFixture<EditarEstudiantesComponent>;
  const matDialogSpy: jasmine.SpyObj<MatDialogRef<any>> = jasmine.createSpyObj("MatDialogRef", ["open", "close"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstudiantesComponent ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogSpy },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        // ...
      ],
      imports: [
        ReactiveFormsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario se mantiene invalido cuando ingreso unicamente el nombre del estudiante', () => {
    const formulario =component.formularioEstudianteEditar;
    const nombre = formulario.controls['nombre'];
    nombre.setValue('Duvan');
    expect(formulario.valid).toBeFalse();
  });

  it('El formulario se mantiene valido cuando ingreso toda la información', () => {
    const formulario =component.formularioEstudianteEditar;
    const correo = formulario.controls['correo'];
    const nombre = formulario.controls['nombre'];
    const apellido = formulario.controls['apellido'];
    const edad = formulario.controls['edad'];
    const id = formulario.controls['id'];
    correo.setValue('duvan@hotmail.com');
    nombre.setValue('Duvan');
    apellido.setValue('Caicedo');
    edad.setValue(23);
    id.setValue('2');
    expect(formulario.valid).toBeTrue();
  });

  it('El formulario se mantiene invalido cuando ingreso el correo sin el formato de correcto', () => {
    const formulario =component.formularioEstudianteEditar;
    const correo = formulario.controls['correo'];
    const nombre = formulario.controls['nombre'];
    const apellido = formulario.controls['apellido'];
    const edad = formulario.controls['edad'];
    const id = formulario.controls['id'];
    correo.setValue('duvan@hotmail');//falta el .com
    nombre.setValue('Duvan');
    apellido.setValue('Caicedo');
    edad.setValue(23);
    id.setValue('2');
    expect(formulario.valid).toBeFalse();
  });

  it("Se cierra el dialogo cuando llama a la funcion guardar", () => {
   component.guardar();
   expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it("Retorna de manera correcta la informacion", () => {
    const formulario =component.formularioEstudianteEditar;
    const correo = formulario.controls['correo'];
    const nombre = formulario.controls['nombre'];
    const apellido = formulario.controls['apellido'];
    const edad = formulario.controls['edad'];
    const id = formulario.controls['id'];
    correo.setValue('duvan@hotmail.com');
    nombre.setValue('Duvan');
    apellido.setValue('Caicedo');
    edad.setValue(23);
    id.setValue('2');
    const datos=component.leer();
   expect(datos).toEqual(formulario.value);
  });
});
