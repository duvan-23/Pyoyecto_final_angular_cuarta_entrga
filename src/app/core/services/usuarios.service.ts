import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor(
    private http: HttpClient
  ) {}
  obtenerUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.api}/usuariosProyecto`,{
      headers: new HttpHeaders(environment.header)
    }).pipe(
      catchError(this.manejaError)
    );
  }
  agregarUsuario(usuario: Usuario){
    this.http.post<Usuario>(`${environment.api}/usuariosProyecto`,usuario,{
      headers: new HttpHeaders(environment.header)
    }).pipe(
      catchError(this.manejaError)
    ).subscribe(console.log);
  }
  // obtenerId():number{
  //   return this.cursos[this.cursos.length -1].id+1;
  // }
  obtenerUsuario(id: number){
    return this.http.get<Usuario>(`${environment.api}/usuariosProyecto/${id}`,{
      headers: new HttpHeaders(environment.header)
    }).pipe(
      catchError(this.manejaError)
    );
  }
  editarUsuario(usuario: Usuario){
    this.http.put<Usuario>(`${environment.api}/usuariosProyecto/${usuario.id}`,usuario).pipe(
      catchError(this.manejaError)
    ).subscribe(console.log);
  }
  eliminarUsuario(id: number){
    this.http.delete<Usuario>(`${environment.api}/usuariosProyecto/${id}`).pipe(
      catchError(this.manejaError)
    ).subscribe(console.log);
  }
  private manejaError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn("Error del lado del cliente", error.error.message);
    }else{
      console.warn("Error del lado del servidor", error.error.message);
    }

    return throwError(()=> new Error('Error en La comunicación HTTP'))
  }
}
