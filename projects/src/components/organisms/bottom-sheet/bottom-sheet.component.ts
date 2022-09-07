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
  selector: 'xft-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BottomSheetComponent implements OnInit {
  @Input()
  public visible = false;

  private _componentDOM: ComponentDOM;

  private _component?: Element;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-bottom-sheet');
  }

  public get show(): boolean {
    return this.visible;
  }

  public open(): void {
    this.visible = true;
  }

  public close(): void {
    this.visible = false;
  }

  public append(children: any): void {
    if (!this._component) {
      const selector = this._componentDOM.querySelector(
        '.xft-bottom-sheet__component'
      );

      if (selector.isPresent()) {
        this._component = selector.get();
      }
    }

    this._component?.appendChild(children);
  }
}
