import { Overlay } from '@angular/cdk/overlay';
import { ComponentRef, Injectable } from '@angular/core';
import { OverlayElement, OverlayElementFactory } from '../../utils/overlay';
import {
  NotificationComponent,
  NotificationConfig
} from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationComponentService {
  private _ref: ComponentRef<NotificationComponent>;

  private _overlay: OverlayElement<NotificationComponent>;

  private _component: NotificationComponent;

  constructor(private overlay: Overlay) {
    this._overlay = OverlayElementFactory(this.overlay, NotificationComponent);

    this._ref = this._overlay.componentRef;

    this._component = this._ref.instance;
  }

  public launch(config: NotificationConfig): void {
    this._component.launch(config);
  }

  public destroy(): void {
    this._overlay.destroy();
  }
}
