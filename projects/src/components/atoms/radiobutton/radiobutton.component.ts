import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils/dom';

@Component({
  selector: 'xft-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadiobuttonComponent implements OnInit {
  @Input()
  public checked = true;

  @Input()
  public enabled = true;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-radiobutton');
    this._componentDOM.setAttribute('tabindex', '0');
  }
}
