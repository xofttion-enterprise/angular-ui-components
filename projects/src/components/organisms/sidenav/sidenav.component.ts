import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils/dom';

@Component({
  selector: 'xft-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnChanges {
  @Input()
  public visible = true;

  @Output()
  public visibleChange: EventEmitter<boolean>;

  private _componentDOM: ComponentDOM;

  constructor(protected _ref: ElementRef, protected _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.visibleChange = new EventEmitter<boolean>();
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-sidenav');

    this._statusVisible(this.visible);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      this._statusVisible(changes['visible'].currentValue);
    }
  }

  public onClickBackdrop(): void {
    this._statusVisible(false);
    this.visible = false;

    this.visibleChange.emit(false);
  }

  private _statusVisible(value: boolean): void {
    this._componentDOM.toggleClass('xft-sidenav--hide', !value);
    this._componentDOM.toggleClass('xft-sidenav--show', value);
  }
}
