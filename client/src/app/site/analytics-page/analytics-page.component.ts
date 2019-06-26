import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AnalyticsService } from './../../core/services/analtics.service';
import { AnalyticsPage } from 'src/app/shared/interfaces';
import { Chart } from 'chart.js'
@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  average: number
  pending = true

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit() {
    let gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255,99,132)'
    }
    let orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54,162,235)'
    }
    this.service.getAnalytics().pipe(untilDestroyed(this)).subscribe((data: AnalyticsPage) => {
      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      this.average = data.average

      let gainContext = this.gainRef.nativeElement.getContext('2d')
      let orderContext = this.orderRef.nativeElement.getContext('2d')

      gainContext.canvas.height = '300px'
      orderContext.canvas.height = '300px'

      new Chart(gainContext, chreateChartConfig(gainConfig))
      new Chart(orderContext, chreateChartConfig(orderConfig))

      this.pending = false
    })
  }

  ngOnDestroy() {
    // Нужен для untilDestroyed
  }
}
function chreateChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}

