import { Category } from './../../../shared/interfaces';
import { CategoriesService } from '../../../core/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-category',
  templateUrl: './order-category.component.html',
  styleUrls: ['./order-category.component.scss']
})
export class OrderCategoryComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private catServ: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.catServ.fetch()
  }

}
