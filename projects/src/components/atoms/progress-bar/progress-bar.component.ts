import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils/dom';

@Component({
  selector: 'xft-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input()
  public indeterminate = false;

  @Input()
  public width = 0;

  private _componentDOM: ComponentDOM;

  public percentage = '0%';

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-progress-bar');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeStatusWidth(changes);
  }

  private _changeStatusWidth(changes: SimpleChanges): void {
    if (changes['width']) {
      let width = changes['width'].currentValue;

      if (width < 0) {
        width = 0;
      } else if (width > 100) {
        width = 100;
      }

      this.percentage = `${width}%`;
    }
  }
}
