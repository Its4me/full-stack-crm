import { Order, Filter } from './../../shared/interfaces';
import { Subscription } from 'rxjs';
import { MaterialService, MaterialInstance } from 'src/app/shared/Classes/material.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { OrdersService } from 'src/app/core/services/orders.service';

const STEP = 3

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef

  filter: Filter = {}
  tooltip: MaterialInstance
  offset = 0
  limit = STEP
  oSub: Subscription
  orders: Order[] = []

  isFilter = false
  reloading = false
  loading = false
  noMoreOrders = false

  constructor(
    private orderServ: OrdersService
  ) { }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }
  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }
  ngOnDestroy() {
    this.tooltip.destroy()
    if (this.oSub)
      this.oSub.unsubscribe()
  }

  fetch() {
    const params =  Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
 
    this.oSub = this.orderServ.fetch(params).subscribe(orders => {
      this.loading = false
      this.reloading = false
      this.noMoreOrders = orders.length < STEP
      this.orders.push(...orders)
    }) 
  }
  loadMore() {
    this.loading = true
    this.offset += STEP
    this.fetch()
  }
  apllyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()
  }

  isFiltered(): boolean{
    return Object.keys(this.filter).length != 0   
  }
}
