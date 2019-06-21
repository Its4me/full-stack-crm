import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/Classes/auth.guard';
import { AuthLayoutComponent } from './login/auth-layout/auth-layout.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { SiteLayoutComponent } from './site/site-layout/site-layout.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegisterComponent },
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
