import { Overlay } from '@angular/cdk/overlay';
import { ComponentRef, Injectable } from '@angular/core';
import { OverlayElement, OverlayElementFactory } from '../../utils/overlay';
import { SnackbarComponent, SnackbarConfig } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarComponentService {
  private _ref: ComponentRef<SnackbarComponent>;

  private _overlay: OverlayElement<SnackbarComponent>;

  private _component: SnackbarComponent;

  constructor(private overlay: Overlay) {
    this._overlay = OverlayElementFactory(this.overlay, SnackbarComponent);

    this._ref = this._overlay.componentRef;

    this._component = this._ref.instance;
  }

  public launch(config: SnackbarConfig): void {
    this._component.launch(config);
  }

  public success(message: string, title = ''): void {
    this.launch({
      title,
      icon: 'checkmark-circle',
      message,
      theme: 'success'
    });
  }

  public info(message: string, title = ''): void {
    this.launch({
      title,
      icon: 'info',
      message,
      theme: 'info'
    });
  }

  public happy(message: string, title = ''): void {
    this.launch({
      title,
      icon: 'question-mark-circle',
      message,
      theme: 'happy'
    });
  }

  public warning(message: string, title = ''): void {
    this.launch({
      title,
      icon: 'alert-triangle',
      message,
      theme: 'warning'
    });
  }

  public danger(message: string, title = ''): void {
    this.launch({
      title,
      icon: 'close-circle',
      message,
      theme: 'danger'
    });
  }

  public destroy(): void {
    this._overlay.destroy();
  }
}
