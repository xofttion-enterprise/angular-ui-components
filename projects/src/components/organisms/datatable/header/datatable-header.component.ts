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
import {
  ActionDatatable,
  ComponentDOM,
  isActionDisabled,
  isActionHidden,
  isActionProgress
} from '../../../utils';

@Component({
  selector: 'xft-datatable-header',
  templateUrl: './datatable-header.component.html',
  styleUrls: ['./datatable-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatatableHeaderComponent implements OnInit {
  @Input()
  public title?: string;

  @Input()
  public subtitle?: string;

  @Input()
  public actions?: ActionDatatable[];

  @Output()
  public action: EventEmitter<ActionDatatable>;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.action = new EventEmitter<ActionDatatable>();
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-datatable-header');
  }

  public onAction(action: ActionDatatable): void {
    action.onClick ? action.onClick() : this.action.emit(action);
  }

  public isDisabled(action: ActionDatatable): boolean {
    return isActionDisabled(action);
  }

  public isHidden(action: ActionDatatable): boolean {
    return isActionHidden(action);
  }

  public isProgress(action: ActionDatatable): boolean {
    return isActionProgress(action);
  }
}
