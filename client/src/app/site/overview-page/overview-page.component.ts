import { MaterialService } from 'src/app/shared/Classes/material.service';
import { MaterialInstance } from './../../shared/Classes/material.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsService } from 'src/app/core/services/analtics.service';
import { Observable } from 'rxjs';
import { OverviewPage } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tapTarget') tapTargetRef: ElementRef

  data$: Observable<OverviewPage>
  tapTarget: MaterialInstance
  yesterday = new Date()

  constructor(private service: AnalyticsService) { }

  ngOnInit() {
    this.yesterday.setDate(this.yesterday.getDate() - 1)
    this.data$ = this.service.getOverview()
  }
  ngAfterViewInit(){
    this.tapTarget = MaterialService.initTaptarget(this.tapTargetRef)
  }

  ngOnDestroy(){
    this.tapTarget.destroy()
  }
  openInfo(){
    this.tapTarget.open()
  }

}
