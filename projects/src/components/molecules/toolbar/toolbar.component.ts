import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils/dom';

@Component({
  selector: 'xft-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent {
  @Input()
  public subtitle?: string;

  @Input()
  public icon?: string;

  @Input()
  public breadcrumbs: string[] = [];

  @Output()
  public action: EventEmitter<MouseEvent>;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.action = new EventEmitter<MouseEvent>();
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-toolbar');
  }

  public onClickAction(event: MouseEvent): void {
    this.action.emit(event);
  }
}
