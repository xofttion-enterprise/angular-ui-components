import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { ComponentDOM } from '../components/utils/dom';

const prefixClass = 'theme-xofttion'

@Directive({
  selector: '[xofttionTheme]'
})
export class ThemeDirective implements OnChanges {
  @Input()
  public xofttionTheme = 'default';

  private _theme?: string;

  private _componentDOM: ComponentDOM;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['xofttionTheme']) {
      const themeValue = changes['xofttionTheme'].currentValue;

      if (this._theme) {
        this._componentDOM.removeClass(this._theme);
      }

      this._theme = `${prefixClass}--${themeValue}`;
      this._componentDOM.addClass(this._theme);
    }
  }
}
