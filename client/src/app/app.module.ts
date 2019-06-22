import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SiteModule } from './site/site.module';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LoginModule,
    SiteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
