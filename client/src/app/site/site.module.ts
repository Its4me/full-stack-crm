import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './site-layout/site-layout.component';

@NgModule({
  declarations: [
    SiteLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SiteModule { }
