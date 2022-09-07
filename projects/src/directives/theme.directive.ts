import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { ComponentDOM, setThemeDOM } from '../components/utils';

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
      this._theme = setThemeDOM(
        this._componentDOM,
        changes['xofttionTheme'].currentValue,
        this._theme
      );
    }
  }
}
