import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Session } from 'src/app/models/sesion';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionSubject!: BehaviorSubject<Session>;
  usuarios$!:  Observable<Usuario[]>;
  usuario!: any;
  constructor(
    private usuarioService: UsuariosService,
    private router:Router
  ) {
    const session: Session = {
      sessionActiva:false
    };
    this.sessionSubject = new BehaviorSubject(session);
   }
  login(usuario: string, contrasena:string){
    this.usuarios$ = this.usuarioService.obtenerUsuarios();
    this.usuario=this.usuarios$.pipe(
      map((cursos: Usuario[]) => cursos.filter((curso:Usuario)=> curso.usuario ===usuario))
    );
    this.usuario.subscribe((data:any)=>{
      this.usuario=data[0];
      if(this.usuario){
        if(this.usuario.contrasena  == contrasena){
          const session: Session = {
            sessionActiva: true,
            usuarioActivo:this.usuario
          }
          this.sessionSubject.next(session);
          this.router.navigate(['inicio']);
        }else{
          alert("Usuario o Contraseña incorrectas");
        }
      }else{
        alert("Usuario o Contraseña incorrectas");
      }

    })

  }

  obtenerSession(): Observable<Session>{
    return this.sessionSubject.asObservable();
  }
  logoutSession(){
    const session: Session = {
      sessionActiva:false
    };
    this.sessionSubject.next(session);
  }
}
