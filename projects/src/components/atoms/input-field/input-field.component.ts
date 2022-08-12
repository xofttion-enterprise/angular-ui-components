import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ComponentDOM } from '../../utils/dom';

@Component({
  selector: 'xft-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  private _dom: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._dom = ComponentDOM.build(this._ref, this._renderer);
  }
}
