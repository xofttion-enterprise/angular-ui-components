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
  selector: 'xft-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent implements OnInit {
  @Input()
  public active = false;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-section');
  }
}
