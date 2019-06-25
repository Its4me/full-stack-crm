import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/core/services/analtics.service';
import { Observable } from 'rxjs';
import { OverviewPage } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  data$: Observable<OverviewPage>
  
  constructor(private service: AnalyticsService) { }

  ngOnInit() {
    this.data$ = this.service.getOverview()
  }

}
