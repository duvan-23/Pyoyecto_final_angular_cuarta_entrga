import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CursosService } from 'src/app/clases/services/cursos.service';
import { Curso } from 'src/app/models/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  filtro: string="";
  filtro_fecha: string="";
  cursos$!:  Observable<Curso[]>;
  cursos!: Curso[];
  constructor(
    private cursoService: CursosService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cursos$ = this.cursoService.obtenerCursos();
  }

  verCurso(id:number){
    this.router.navigate(['cursos/vista',{id:id}])
  }
}
