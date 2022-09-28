import {
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils';

@Component({
  selector: 'xft-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PosterComponent {
  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-poster');
  }
}
