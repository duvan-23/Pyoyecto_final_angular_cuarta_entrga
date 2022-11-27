import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from 'src/app/models/sesion';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  session$!:Observable<Session>;
  constructor(
    private sessionService: SessionService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.session$ = this.sessionService.obtenerSession();
  }
  logout(){
    this.sessionService.logoutSession();
    this.router.navigate(['login']);
  }
}
