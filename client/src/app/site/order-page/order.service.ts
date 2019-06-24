import { Position, OrderPosition } from './../../shared/interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  list: OrderPosition[] = []
  price = 0


  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quanyity,
      _id: position._id
    })

    const candidate = this.list.find(p => p._id == position._id)
    if (candidate){
      candidate.quantity += position.quanyity
    } else{
      this.list.push(orderPosition)
    }
    this.computePrice()
  }

  delete(orderPosition: OrderPosition) {
    const inx = this.list.findIndex( p => p._id == orderPosition._id)
    this.list.splice(inx, 1)
    this.computePrice()
  }

  clear() { 
    this.list = []
    this.price = 0
  }


  private computePrice(){
    this.price = this.list.reduce( (total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }
}