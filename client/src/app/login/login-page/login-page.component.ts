import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { MaterialService } from 'src/app/shared/Classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  aSub: Subscription = null

  form: FormGroup

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParamMap.subscribe(({params}: Params) => {
      
      if(params['registered']){
        //message Вы зарегестрированы
        MaterialService.toast('Теперь вы зарегестрированы, войдите')
      }
      if(params['accessDenied']){
        //message Сначала войдите
        MaterialService.toast('Сначала войдите')
      }
      if(params['sessionFailed']){
        MaterialService.toast('Войдите заново')
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      res => { 
        this.router.navigate(['/overview'])
      },
      e => {
        //Вывод ошибки
        MaterialService.toast(e.error.message)
        this.form.enable()
      }
    )
  }

}
