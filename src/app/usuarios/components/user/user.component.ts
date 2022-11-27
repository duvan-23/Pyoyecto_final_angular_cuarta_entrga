import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { AgreagarUsuarioComponent } from '../crud_usuarios/agreagar-usuario/agreagar-usuario.component';
import { EditarUsuarioComponent } from '../crud_usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from '../crud_usuarios/eliminar-usuario/eliminar-usuario.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  listaUsuarios$!: Observable<Usuario[]>;
  usuario_edit!: any;
  columnas: string[] = ['id','nombre','Administrador','Super Administrador','Contraseña','acciones'];
  dataSource!: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private usuarioService: UsuariosService,
    private dialog: MatDialog,private _snackBar: MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listaUsuarios$ = this.usuarioService.obtenerUsuarios();
    this.listaUsuarios$.subscribe((data)=>{
        this.dataSource=new MatTableDataSource<Usuario>(data);
        this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  filtrarNombre(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate= function(usuario: Usuario, filtro: string){
      return usuario.usuario.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    };
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  filtrarCorreo(event: Event){
    // const valorObtenido = (event.target as HTMLInputElement).value;
    // this.dataSource.filterPredicate= function(estudiante: Estudiantes, filtro: string){
    //   return estudiante.correo.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    // };
    // this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  agregarUsuario(){
    let dialog =this.dialog.open(AgreagarUsuarioComponent,{
      width: '550px',
      panelClass: 'custom-dialog-container'
    });
    dialog.beforeClosed().subscribe(res=>{
      if(res.usuario){
        this.usuarioService.agregarUsuario({
          ...res,
          id: 0
        });
        this.dataSource.paginator = this.paginator;
        this._snackBar.open(`Agrego el usuario ${res.usuario} Exitosamente`, "Cerrar", {
          duration: 3000
        });
        this.listaUsuarios$ = this.usuarioService.obtenerUsuarios();
        this.listaUsuarios$.subscribe((data)=>{
            this.dataSource=new MatTableDataSource<Usuario>(data);
            this.dataSource.paginator = this.paginator;
        });
        this.router.navigate(['usuarios']);
      }
    })
  }
  editarUsuario(id:number){
    let usuario;
    this.usuarioService.obtenerUsuario(id).subscribe((data)=>{
      usuario=data;
      let dialog =this.dialog.open(EditarUsuarioComponent,{
        width: '550px',
        panelClass: 'custom-dialog-container',
        data: usuario
      });
      dialog.beforeClosed().subscribe(res=>{
        if(res.usuario){
          this.usuarioService.editarUsuario(res);
          this.dataSource.paginator = this.paginator;
          this._snackBar.open(`Edito el usuario ${res.usuario}  Exitosamente`, "Cerrar", {
            duration: 3000
          });
          this.listaUsuarios$ = this.usuarioService.obtenerUsuarios();

          this.listaUsuarios$.subscribe((data)=>{
              this.dataSource=new MatTableDataSource<Usuario>(data);
              this.dataSource.paginator = this.paginator;
          });
          this.router.navigate(['usuarios']);
        }
      })
    });
  }
  eliminarUsuario(id:number){
    this.usuarioService.obtenerUsuario(id).subscribe((data)=>{
      this.usuario_edit=data;
      let dialog =this.dialog.open(EliminarUsuarioComponent,{
        width: '550px',
        panelClass: 'custom-dialog-container',
        data: this.usuario_edit
      });
      dialog.beforeClosed().subscribe(res=>{
        if(res.id){
          this._snackBar.open(`Elimino el estudiante ${this.usuario_edit.usuario} Exitosamente`, "Cerrar", {
            duration: 3000
          });
          this.usuarioService.eliminarUsuario(res.id);
          this.listaUsuarios$ = this.usuarioService.obtenerUsuarios();

          this.listaUsuarios$.subscribe((data)=>{
              this.dataSource=new MatTableDataSource<Usuario>(data);
              this.dataSource.paginator = this.paginator;
          });
          this.router.navigate(['usuarios']);
        }
      })
    });
  }

}
