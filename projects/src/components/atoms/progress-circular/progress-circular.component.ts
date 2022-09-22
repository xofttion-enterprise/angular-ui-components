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
  selector: 'xft-progress-circular',
  templateUrl: './progress-circular.component.html',
  styleUrls: ['./progress-circular.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressCircularComponent implements OnInit {
  @Input()
  public visible = false;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-progress-circular');
  }
}
