import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OrderService } from './order.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { OrderPosition, Order } from './../../shared/interfaces';
import { MaterialInstance } from 'src/app/shared/Classes/material.service';
import { MaterialService } from './../../shared/Classes/material.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef

  isRoot: boolean = true
  modal: MaterialInstance
  pending = false
  private ngUnsubscribe = new Subject();

  constructor(
    private router: Router,
    private orderServ: OrderService,
    private ordersBackServices: OrdersService
  ) { }

  ngOnInit() {
    this.isRoot = this.router.url == '/order'
    this.router.events.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isRoot = this.router.url == '/order'
        }

      })
  }
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.modal.destroy()
  }

  open() {
    this.modal.open()
  }
  cencel() {
    this.modal.close()
  }
  submit() {
    this.pending = true
    const order: Order = {
      list: this.orderServ.list.map(item => {
        delete item._id
        return item
      })
    }

    this.ordersBackServices.create(order)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        newOrder => {
          MaterialService.toast(`Заказ №${newOrder.order} был добавлен`)
          this.orderServ.clear()
        },
        err => MaterialService.toast(err.error.message),
        () => {
          this.modal.close()
          this.pending = false
        }
      )
  }
  deletePosition(orderPosition: OrderPosition) {
    this.orderServ.delete(orderPosition)
  }
}

