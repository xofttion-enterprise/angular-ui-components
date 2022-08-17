import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils/dom';

@Component({
  selector: 'xft-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  private _componentDOM: ComponentDOM;

  private _visible = false;

  private _component?: Element;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-modal');
  }

  public get show(): boolean {
    return this._visible;
  }

  public open(): void {
    this._visible = true;
  }

  public close(): void {
    this._visible = false;
  }

  public append(children: any): void {
    if (!this._component) {
      const selector = this._componentDOM.querySelector(
        '.xft-modal__component'
      );

      if (selector.isPresent()) {
        this._component = selector.get();
      }
    }

    this._component?.appendChild(children);
  }
}
