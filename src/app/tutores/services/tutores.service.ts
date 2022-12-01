import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from 'src/app/models/tutor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutoresService {

  constructor(
    private http:HttpClient
  ) { }
  obtenerTutores(): Observable<Tutor[]>{
    return this.http.get<Tutor[]>(`${environment.api}/tutor`);
  }

  agregarTutores(tutor: Tutor): Observable<Tutor>{
    return this.http.post<Tutor>(`${environment.api}/tutor`,tutor);
  }

  editarTutores(tutor: Tutor): Observable<Tutor>{
    return this.http.put<Tutor>(`${environment.api}/tutor/${tutor.id}`,tutor);
  }

  eliminarTutores(tutor: Tutor): Observable<Tutor>{
    return this.http.delete<Tutor>(`${environment.api}/tutor/${tutor.id}`);
  }
}
