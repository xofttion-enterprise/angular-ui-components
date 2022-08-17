import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import {
  OnOverlay,
  OverlayElement,
  OverlayComponent,
  OverlayService
} from '../../utils/overlay';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalComponentService extends OverlayService {
  constructor(overlay: Overlay) {
    super(overlay);
  }

  public build<C extends OnModalOverlay<C>>(
    children: ComponentType<C>
  ): ModalOverlayComponent<C> {
    const overlayChildren = this._getElement(children);

    const modalParent = new ModalOverlayComponent(
      this._getElement(ModalComponent),
      overlayChildren
    );

    overlayChildren.componentRef.instance.ngOnOverlay(modalParent);

    return modalParent;
  }
}

export class ModalOverlayComponent<C> extends OverlayComponent<ModalComponent, C> {
  constructor(
    overlayParent: OverlayElement<ModalComponent>,
    overlayChild: OverlayElement<C>
  ) {
    super(overlayParent, overlayChild);

    this.parent.append(overlayChild.nativeElement);
  }

  public get show(): boolean {
    return this.parent.show;
  }

  public open(): void {
    this.parent.open();
  }

  public close(): void {
    this.parent.close();
  }
}

export interface OnModalOverlay<C> extends OnOverlay<ModalComponent, C> {
  ngOnOverlay(overlayComponent: ModalOverlayComponent<C>): void;
}
