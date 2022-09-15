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
import { SidenavMenuElement } from './sidenav-menu.element';

@Component({
  selector: 'xft-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavMenuComponent implements OnInit {
  @Input()
  public icon?: string;

  @Input()
  public skeleton = false;

  @Input()
  public elements: SidenavMenuElement[] = [];

  @Output()
  public select: EventEmitter<SidenavMenuElement>;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.select = new EventEmitter<SidenavMenuElement>();
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-sidenav-menu');
  }

  public onClick(element: SidenavMenuElement): void {
    if (!element.disabled) {
      this.select.emit(element);
    }
  }
}
