import { Injectable } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { cursos } from 'src/app/datos/cursos';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursos: Curso[]=cursos;
  private cursoSubject: BehaviorSubject<Curso[]> ;
  constructor(
    private http: HttpClient
  ) {
    this.cursoSubject= new BehaviorSubject(this.cursos);
  }
  obtenerCursos():Observable<Curso[]>{
    return this.http.get<Curso[]>(`${environment.api}/cursosProyecto`,{
      headers: new HttpHeaders(environment.header)
    }).pipe(
      catchError(this.manejaError)
    );
  }
  agregarCurso(curso: Curso){
    this.http.post<Curso>(`${environment.api}/cursosProyecto`,curso,{
      headers: new HttpHeaders(environment.header)
    }).pipe(
      catchError(this.manejaError)
    ).subscribe();
  }
  // obtenerId():number{
  //   return this.cursos[this.cursos.length -1].id+1;
  // }
  obtenerCurso(id: number){
    return this.http.get<Curso>(`${environment.api}/cursosProyecto/${id}`,{
      headers: new HttpHeaders(environment.header)
    }).pipe(
      catchError(this.manejaError)
    );
  }
  editarCurso(curso: Curso){
    this.http.put<Curso>(`${environment.api}/cursosProyecto/${curso.id}`,curso).pipe(
      catchError(this.manejaError)
    ).subscribe();
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
