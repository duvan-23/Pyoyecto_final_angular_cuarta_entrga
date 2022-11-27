import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  formulario: FormGroup
  constructor(
    private sessionService: SessionService,
    private router:Router
  ) {
    this.formulario = new FormGroup({
      usuario: new FormControl('Raleigh_Vandervort64',[Validators.required]),
      contrasena: new FormControl('ndlpmBkVWD4_FHU',[Validators.required])
    })
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void{
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  login(){
    this.sessionService.login(this.formulario.value.usuario,this.formulario.value.contrasena);
    // this.router.navigate(['inicio']);
  }

}
