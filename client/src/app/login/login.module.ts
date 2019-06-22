import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../shared/services/auth.service';

@NgModule({
  declarations: [
    LoginPageComponent,
    AuthLayoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class LoginModule { }
