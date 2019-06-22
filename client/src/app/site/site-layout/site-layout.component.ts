import { MaterialService } from 'src/app/shared/Classes/material.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floatingButton') floatingRef: ElementRef

  links = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' }
  ]


  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit(){
    MaterialService.initFloatingButton(this.floatingRef)
  }

  logout(){
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
