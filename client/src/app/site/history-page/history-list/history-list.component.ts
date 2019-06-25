import { Order } from './../../../shared/interfaces';
import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/Classes/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements  OnDestroy, AfterViewInit {

  @Input('orders') orders: Order[]
  @ViewChild('modal') modalRef: ElementRef

  modal: MaterialInstance
  selectedOrder: Order

  constructor() { }

  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)  
  }
  ngOnDestroy() {
    this.modal.destroy()
  }

  computePrice(order: Order): Number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  selectOrder(order: Order){
    this.selectedOrder = order
    this.modal.open()
  }
  closeModal(){
    this.modal.close()
  }
}
