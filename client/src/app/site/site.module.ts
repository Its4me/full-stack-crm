import { AnalyticsService } from 'src/app/core/services/analtics.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesService } from '../core/services/categories.service';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';
import { PositionsService } from '../core/services/position.service';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { OrderCategoryComponent } from './order-page/order-category/order-category.component';
import { SharedModule } from './../shared/shared.module';
import { OrderService } from './order-page/order.service';
import { OrdersService } from '../core/services/orders.service';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';

@NgModule({
  declarations: [
    SiteLayoutComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoryComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    CategoriesService,
    PositionsService,
    OrderService,
    OrdersService,
    AnalyticsService
  ]
})
export class SiteModule { }
