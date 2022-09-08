import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM, setThemeDOM } from '../../utils';

export const SNACKBAR_DURATION_ANIMATION = 240;
export const SNACKBAR_DURATION_MIN = 2000;
export const SNACKBAR_DURATION_MAX = 7000;

const SNACKBAR_DURATION_CHAR = 50;

export function getDurationSnackbar(message: string): number {
  let duration = message.length * SNACKBAR_DURATION_CHAR;

  if (duration < SNACKBAR_DURATION_MIN) {
    duration = SNACKBAR_DURATION_MIN;
  } else if (duration > SNACKBAR_DURATION_MAX) {
    duration = SNACKBAR_DURATION_MAX;
  }

  return duration + SNACKBAR_DURATION_ANIMATION * 2;
}

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

  public config: SnackbarConfig = { message: '' };

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
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
        config.theme || 'default',
        this.config.theme
      );

      this.config = config;
      this._visible = true;

      const duration = getDurationSnackbar(config.message);

      this._timeoutId = setTimeout(() => this._hide(), duration);
    } else {
      this._hideForce();

      setTimeout(() => this.launch(config), SNACKBAR_DURATION_ANIMATION);
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
