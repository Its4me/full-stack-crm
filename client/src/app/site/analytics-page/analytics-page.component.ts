import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AnalyticsService } from './../../core/services/analtics.service';
import { AnalyticsPage } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  avarage: number
  pending = true

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit() {
    this.service.getAnalytics().pipe(untilDestroyed(this)).subscribe((data: AnalyticsPage) => {
      this.pending = false
    })
  }

  ngOnDestroy() {
    // Нужен для untilDestroyed
  }
}

