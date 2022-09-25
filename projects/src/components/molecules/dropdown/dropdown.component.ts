import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ComponentDOM } from '../../utils';

interface Position {
  value: number;
  override: boolean;
}

@Component({
  selector: 'xft-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {
  @HostListener('document:click', ['$event.target'])
  public onClickDocument(element: HTMLElement) {
    const verify = this._element?.contains(element);

    if (!verify && this._autoclose) {
      this.close();
    }
  }

  private _componentDOM: ComponentDOM;

  private _visible = false;

  private _component: any;

  private _content?: HTMLElement;

  private _element?: HTMLElement;

  private _top = 0;

  private _left = 0;

  private _origin = '0% 0%';

  private _autoclose = true;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-dropdown');

    const querySelector = this._componentDOM.querySelector(
      '.xft-dropdown__content'
    );

    if (querySelector.isPresent()) {
      this._content = querySelector.get() as HTMLElement;
    }
  }

  public get show(): boolean {
    return this._visible;
  }

  public get top(): string {
    return `${this._top}px`;
  }

  public get left(): string {
    return `${this._left}px`;
  }

  public get origin(): string {
    return this._origin;
  }

  public onElement(target: HTMLElement, autoclose = true): void {
    const { x, y, width, height } = target.getBoundingClientRect();

    const positionX = x + width / 2;
    const positionY = y + height / 2;

    this._element = target;

    this.open(positionX, positionY, autoclose);
  }

  public open(x: number, y: number, autoclose = true): void {
    this._autoclose = autoclose;

    const positionX = this._getPositionX(x);
    const positionY = this._getPositionY(y);

    this._left = positionX.value;
    this._top = positionY.value;
    this._origin = this._getOrigin(positionX, positionY);

    this._visible = true;
  }

  public close(): void {
    this._visible = false;
  }

  public append(children: any): void {
    const element = this._ref.nativeElement;

    if (!this._component) {
      this._component = element.querySelector('.xft-dropdown__component');
    }

    this._component.appendChild(children);
  }

  private _getPositionX(positionX: number): Position {
    const contentWidth = this._content?.clientWidth || 0;

    const positionEnd = positionX + contentWidth;

    if (positionEnd >= window.innerWidth) {
      return {
        value: positionX - contentWidth,
        override: true
      };
    }

    return {
      value: positionX,
      override: false
    };
  }

  private _getPositionY(positionY: number): Position {
    const contentHeight = this._content?.clientHeight || 0;

    const positionEnd = positionY + contentHeight;

    if (positionEnd >= window.innerHeight) {
      return {
        value: positionY - contentHeight,
        override: true
      };
    }

    return {
      value: positionY,
      override: false
    };
  }

  private _getOrigin(positionX: Position, positionY: Position): string {
    if (positionX.override) {
      return positionY.override ? '100% 100%' : '100% 0%';
    } else {
      return positionY.override ? '0% 100%' : '0% 0%';
    }
  }
}
