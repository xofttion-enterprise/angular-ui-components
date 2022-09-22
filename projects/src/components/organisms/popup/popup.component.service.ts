import { Overlay } from '@angular/cdk/overlay';
import { ComponentRef, Injectable } from '@angular/core';
import { OverlayElement, OverlayElementFactory } from '../../utils/overlay';
import { PopupComponent } from './popup.component';
import { PopupConfig } from './popup.config';

@Injectable({
  providedIn: 'root'
})
export class PopupComponentService {
  private _ref: ComponentRef<PopupComponent>;

  private _overlay: OverlayElement<PopupComponent>;

  private _component: PopupComponent;

  constructor(private overlay: Overlay) {
    this._overlay = OverlayElementFactory(this.overlay, PopupComponent);

    this._ref = this._overlay.componentRef;

    this._component = this._ref.instance;
  }

  public launch(config: PopupConfig): void {
    this._component.launch(config);
  }

  public destroy(): void {
    this._overlay.destroy();
  }
}
