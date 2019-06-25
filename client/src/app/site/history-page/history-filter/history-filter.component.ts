import { MaterialService, MaterialDatepicker } from 'src/app/shared/Classes/material.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef

  order: Number
  start: MaterialDatepicker
  end: MaterialDatepicker
  isValid = true

  constructor() { }


  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
  }
  ngOnDestroy() {
    this.start.destroy()
    this.end.destroy()
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true
      return
    }
    this.isValid = this.start.date < this.end.date
  }
  submitFilter() {

    let filter: Filter = {}

    if (this.order) {
      filter.order = this.order
    }
    if (this.start.date) {
      filter.start = this.start.date
    }
    if (this.end.date) {
      filter.end = this.end.date
    }

    this.onFilter.emit(filter)
  }

}