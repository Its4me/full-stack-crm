import { Position } from './../../../../shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService, MaterialInstance } from 'src/app/shared/Classes/material.service';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from '../../../../core/services/position.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('category') categoryId: string
  @ViewChild('modal') modalRef: ElementRef

  private ngUnsubscribe = new Subject();



  loading = false
  positions: Position[] = []
  modal: MaterialInstance
  form: FormGroup
  positionId = null


  constructor(
    private posServ: PositionsService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(0.01)])
    })

    this.loading = true
    this.posServ.fetch(this.categoryId).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })
  }
  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }
  ngOnDestroy() {
    this.modal.destroy()
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onSelectPosition(position: Position) {
    this.positionId = position._id

    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    MaterialService.updateInputs()
  }
  onAddPosition() {
    this.positionId = null
    this.form.reset()
    this.modal.open()
  }
  onCancel() {
    this.modal.close()
  }
  onSubmit() {
    this.form.disable()

    let position: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    }

    const complete = () => {
      this.form.enable()
      this.modal.close()
      this.form.reset({ name: null, cost: null })
    }

    if (this.positionId) {
      position._id = this.positionId
      this.posServ.update(position).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe(
        pos => {
          const index = this.positions.findIndex(p => p._id == pos._id)
          MaterialService.toast('Товар изменен')
          this.positions[index] = pos
        }, err => {

          MaterialService.toast(err.error.message)
        },
        complete
      )
    } else {

      this.posServ.create(position).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe(
        pos => {
          MaterialService.toast('Товар создан')
          this.positions.push(pos)
        }, err => {

          MaterialService.toast(err.error.message)
        },
        complete
      )
    }


  }
  onDeletePosition(e: Event, position: Position) {
    e.stopPropagation()
    const desidion = window.confirm(`Вы точно хотите удалить ${position.name}`)
    if (desidion) {
      this.posServ.delete(position._id).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe(res => {
        const index = this.positions.findIndex(p => p._id == position._id)
        this.positions.splice(index, 1)
        MaterialService.toast(res.message)
      }, err => MaterialService.toast(err.error.message))
    }
  }

}
