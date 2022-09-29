import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils';
import { DatatableHeader } from './datatable.header';

@Component({
  selector: 'xft-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent implements OnInit {
  @Input()
  public header?: DatatableHeader;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-datatable');
  }

  public get subtitle(): string {
    return this.header?.subtitle
      ? typeof this.header?.subtitle === 'function'
        ? this.header?.subtitle()
        : this.header?.subtitle
      : '';
  }
}
