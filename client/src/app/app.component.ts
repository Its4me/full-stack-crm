import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token')
    if(token !== null){
      this.auth.setToken(token)
    }
  }
}