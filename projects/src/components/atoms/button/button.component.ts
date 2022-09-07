import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils';

@Component({
  selector: 'button[xft-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {
  @Input('xft-button')
  public xftButton = 'flat';

  @Input()
  public prefixIcon?: string;

  @Input()
  public suffixIcon?: string;

  private _componentDOM: ComponentDOM;

  private _classButton = 'xft-button__content--flat';

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-button');

    this._classButton = `xft-button__content--${this.xftButton}`;
  }

  public get classButton(): string {
    return this._classButton;
  }
}
