import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesService } from './categories-page/categories.service';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';

@NgModule({
  declarations: [
    SiteLayoutComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    CategoriesFormComponent,
    PositionsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    CategoriesService
  ]
})
export class SiteModule { }
