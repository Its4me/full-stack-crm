import { MaterialService } from './../../shared/Classes/material.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup

  aSub: Subscription

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
  ngOnDestroy(){
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
  onSubmit() {
    this.form.disable()

    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      e => {
        //Вывод ошибки
        MaterialService.toast(e.error.message)
        this.form.enable()

      }
    )
  }

}
