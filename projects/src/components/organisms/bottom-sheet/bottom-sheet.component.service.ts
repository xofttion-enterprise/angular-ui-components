import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import {
  OnOverlay,
  OverlayElement,
  OverlayComponent,
  OverlayService
} from '../../utils/overlay';
import { BottomSheetComponent } from './bottom-sheet.component';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetComponentService extends OverlayService {
  constructor(overlay: Overlay) {
    super(overlay);
  }

  public build<C extends OnBottomSheetOverlay<C>>(
    children: ComponentType<C>
  ): BottomSheetOverlayComponent<C> {
    const overlayChildren = this._getElement(children);

    const modalParent = new BottomSheetOverlayComponent(
      this._getElement(BottomSheetComponent),
      overlayChildren
    );

    overlayChildren.componentRef.instance.ngOnOverlay(modalParent);

    return modalParent;
  }
}

export class BottomSheetOverlayComponent<C> extends OverlayComponent<BottomSheetComponent, C> {
  constructor(
    overlayParent: OverlayElement<BottomSheetComponent>,
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

export interface OnBottomSheetOverlay<C> extends OnOverlay<BottomSheetComponent, C> {
  ngOnOverlay(overlay: BottomSheetOverlayComponent<C>): void;
}
