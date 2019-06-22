import { ElementRef } from '@angular/core';

declare var M

export class MaterialService {
  
  static toast(message: string) {
    M.toast({html: message})
  }

  static initFloatingButton(elem: ElementRef){
    M.FloatingActionButton.init(elem.nativeElement );
  }
}