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
  selector: 'button[xft-button-action]',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonActionComponent implements OnInit {
  @Input('xft-button-action')
  public icon!: string;

  @Input()
  public tooltip?: string;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-button-action');
  }
}
