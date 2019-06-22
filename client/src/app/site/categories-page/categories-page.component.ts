import { Observable } from 'rxjs';
import { Category } from './../../shared/interfaces';
import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent {

  categories$: Observable <Category[]>

  constructor(private catServ: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.catServ.fetch()
  }

}
