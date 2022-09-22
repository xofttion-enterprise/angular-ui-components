import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM, setThemeDOM } from '../../utils';
import { PopupConfig } from './popup.config';

@Component({
  selector: 'xft-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit {
  private _componentDOM: ComponentDOM;

  private _config!: PopupConfig;

  private _visible = false;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-popup');
  }

  public get config(): PopupConfig | undefined {
    return this._config;
  }

  public get visible(): boolean {
    return this._visible;
  }

  public launch(config: PopupConfig): void {
    config.theme = setThemeDOM(
      this._componentDOM,
      config.theme || 'xofttion',
      this._config?.theme
    );

    this._config = config;

    this._visible = true;
  }

  public onApproved(): void {
    this._visible = false;

    if (this._config?.approved?.onClick) {
      this._config.approved.onClick();
    }
  }

  public onReject(): void {
    this._visible = false;

    if (this._config?.reject?.onClick) {
      this._config.reject.onClick();
    }
  }
}
