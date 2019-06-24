import { MaterialService } from './../../../shared/Classes/material.service';
import { switchMap, map } from 'rxjs/operators';
import { Position } from './../../../shared/interfaces';
import { PositionsService } from './../../../core/services/position.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(
    private route: ActivatedRoute,
    private posServ: PositionsService,
    private orderServ: OrderService
  ) { }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => this.posServ.fetch(params['id'])),
      map( (positions: Position[]) => {
        return positions.map( position =>{
          position.quanyity = 1
          return position
        })
      })
    )
    
  }
  addToOrder(position: Position){
    MaterialService.toast(`Добавлено х${position.quanyity}`)
    this.orderServ.add(position)
  }

}
