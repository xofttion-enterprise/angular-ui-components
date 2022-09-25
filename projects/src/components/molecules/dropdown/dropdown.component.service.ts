import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import {
  OnOverlay,
  OverlayComponent,
  OverlayElement,
  OverlayService
} from '../../utils/overlay';
import { DropdownComponent } from './dropdown.component';

@Injectable({
  providedIn: 'root'
})
export class DropdownComponentService extends OverlayService {
  constructor(overlay: Overlay) {
    super(overlay);
  }

  public build<C extends OnDropdownOverlay<C>>(
    children: ComponentType<C>
  ): DropdownOverlayComponent<C> {
    const overlayChildren = this._getElement(children);

    const dropdownParent = new DropdownOverlayComponent(
      this._getElement(DropdownComponent),
      overlayChildren
    );

    overlayChildren.componentRef.instance.ngOnOverlay(dropdownParent);

    return dropdownParent;
  }
}

export class DropdownOverlayComponent<C> extends OverlayComponent<
  DropdownComponent,
  C
> {
  constructor(
    overlayParent: OverlayElement<DropdownComponent>,
    overlayChild: OverlayElement<C>
  ) {
    super(overlayParent, overlayChild);

    this.parent.append(overlayChild.nativeElement);
  }

  public onElement(target: HTMLElement, autoclose = true): void {
    this.parent.onElement(target, autoclose);
  }

  public open(x: number, y: number, autoclose = true): void {
    this.parent.open(x, y, autoclose);
  }

  public close(): void {
    this.parent.close();
  }
}

export interface OnDropdownOverlay<C> extends OnOverlay<DropdownComponent, C> {
  ngOnOverlay(overlayComponent: DropdownOverlayComponent<C>): void;
}
