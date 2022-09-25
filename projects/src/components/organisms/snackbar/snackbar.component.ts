import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {
  ComponentDOM,
  getDurationMessenger,
  MESSENGER_DURATION_ANIMATION,
  setThemeDOM
} from '../../utils';

export interface SnackbarConfig {
  title?: string;
  icon?: string;
  message: string;
  theme?: string;
}

@Component({
  selector: 'xft-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent implements OnInit, OnDestroy {
  private _componentDOM: ComponentDOM;

  private _timeoutId?: any;

  private _visible = false;

  public config: SnackbarConfig;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.config = { message: '' };
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-snackbar');
  }

  public ngOnDestroy(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  public get visible(): boolean {
    return this._visible;
  }

  public launch(config: SnackbarConfig): void {
    if (!this._visible) {
      this.config.theme = setThemeDOM(
        this._componentDOM,
        config.theme || 'xofttion',
        this.config.theme
      );

      this.config = config;
      this._visible = true;

      const duration = getDurationMessenger(config.message);

      this._timeoutId = setTimeout(() => this._hide(), duration);
    } else {
      this._hideForce();

      setTimeout(() => this.launch(config), MESSENGER_DURATION_ANIMATION);
    }
  }

  private _hideForce(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    this._timeoutId = undefined;
    this._hide();
  }

  private _hide(): void {
    this._visible = false;
  }
}
