import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils';

@Component({
  selector: 'xft-button-progress',
  templateUrl: './button-progress.component.html',
  styleUrls: ['./button-progress.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonProgressComponent implements OnInit {
  @Input()
  public button = '';

  @Input()
  public disabled = false;

  @Input()
  public progress = false;

  @Input()
  public tooltip?: string;

  @Output()
  public action: EventEmitter<Event>;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.action = new EventEmitter<Event>();
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-button-progress');
  }

  public onClick(event: Event): void {
    this.action.emit(event);
  }
}
