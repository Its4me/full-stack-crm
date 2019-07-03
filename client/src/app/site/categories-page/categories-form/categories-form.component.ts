import { Category, Message } from './../../../shared/interfaces';
import { MaterialService } from './../../../shared/Classes/material.service';
import { CategoriesService } from '../../../core/services/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild('input') inputRef: ElementRef
  image: File
  isNew = true
  imagePreview: string | ArrayBuffer = ''
  form: FormGroup
  category: Category
  constructor(
    private route: ActivatedRoute,
    private catServ: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    this.form.disable()
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false;
          return this.catServ.getCategoryById(params['id'])
        }
        return of(null)
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((category: Category) => {
      if (category) {
        this.form.patchValue({
          name: category.name,
        })
        this.category = category
        this.imagePreview = category.imageSrc
        MaterialService.updateInputs()
      }
      this.form.enable()
    },
      err => MaterialService.toast(err.error.message)
    )

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {

    this.image = event.target.files[0]

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(this.image)

  }

  onSubmit() {
    this.form.disable()
    if (this.isNew) {
      this.catServ.create(this.form.value.name, this.image).pipe
        (takeUntil(this.ngUnsubscribe))
        .subscribe(category => {
          this.category = category
          MaterialService.toast('Сохранено')
        }, err => {

          MaterialService.toast(err.error.message)
        }, () => this.form.enable())
    } else {

      this.catServ.update(this.category._id, this.form.value.name, this.image).pipe
      (takeUntil(this.ngUnsubscribe))
      .subscribe(message => {
        MaterialService.toast('Сохранено')
      }, err => {

        MaterialService.toast(err.error.message)
      }, () => this.form.enable())
    }
    
  }

  deleteCategory() {
    const desidion = window.confirm(`Вы точно хотите удалить категорию ${this.category.name}`)
    if (desidion) {
      this.catServ.delete(this.category._id).pipe(
        takeUntil(this.ngUnsubscribe)
      )
        .subscribe(
          res => MaterialService.toast(res.message),
          err => MaterialService.toast(err.error.message),
          () => this.router.navigate(['/categories'])
        )
    }


  }


} 