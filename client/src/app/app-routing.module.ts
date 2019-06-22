import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/Classes/auth.guard';
import { AuthLayoutComponent } from './login/auth-layout/auth-layout.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { SiteLayoutComponent } from './site/site-layout/site-layout.component';
import { RegisterComponent } from './login/register/register.component';
import { OverviewPageComponent } from './site/overview-page/overview-page.component';
import { CategoriesPageComponent } from './site/categories-page/categories-page.component';
import { OrderPageComponent } from './site/order-page/order-page.component';
import { HistoryPageComponent } from './site/history-page/history-page.component';
import { AnalyticsPageComponent } from './site/analytics-page/analytics-page.component';

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
      { path: 'overview', component: OverviewPageComponent  },
      { path: 'analytics', component: AnalyticsPageComponent  },
      { path: 'history', component: HistoryPageComponent  },
      { path: 'order', component: OrderPageComponent  },
      { path: 'categories', component: CategoriesPageComponent  },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
