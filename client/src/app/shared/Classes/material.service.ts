import { ElementRef } from '@angular/core';

declare var M

export interface MaterialInstance {
  open?(): void,
  close?(): void,
  destroy?(): void,
}

export class MaterialService {
  
  static toast(message: string) {
    M.toast({html: message})
  }

  static initFloatingButton(elem: ElementRef){
    M.FloatingActionButton.init(elem.nativeElement );
  }

  static updateInputs(){
    M.updateTextFields()
  }
  static initModal(ref: ElementRef): MaterialInstance{
    return M.Modal.init(ref.nativeElement)
  }
}