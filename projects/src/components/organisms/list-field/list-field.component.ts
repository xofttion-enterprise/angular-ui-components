import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ComponentDOM } from '../../utils';
import { ListFieldElement } from './list-field-element';

const maxPositionVisible = 4;
const listSizeRem = 16;
const elementSizeRem = 4;
const baseSizePx = 16;
const elementSizePx = baseSizePx * elementSizeRem;
const maxListSizePx = baseSizePx * listSizeRem;

interface ListFieldStatus {
  active: boolean;
  hide: boolean;
  show: boolean;
  disabled: boolean;
}

@Component({ template: '' })
export class ListFieldComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input()
  public elementId?: string;

  @Input()
  public label = true;

  @Input()
  public suggestions: Array<ListFieldElement> = [];

  @Input()
  public enabled = true;

  @Input()
  public sheetMode = false;

  protected _inputElement!: HTMLElement;

  private _componentDOM: ComponentDOM;

  private _contentElement!: HTMLElement;

  private _listElement!: HTMLElement;

  private _elements!: NodeListOf<HTMLElement>;

  private _positionElement = 0;

  private _value?: ListFieldElement;

  protected _higher = false;

  public suggestion = '';

  public status: ListFieldStatus;

  public onChange = (_?: unknown): void => undefined;

  public onTouch = (_?: unknown): void => undefined;

  constructor(protected _ref: ElementRef, protected _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.status = {
      active: false,
      show: false,
      hide: true,
      disabled: false
    };
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-list-field');

    this._inputElement = this._ref.nativeElement.querySelector('input');

    this._listElement = this._ref.nativeElement.querySelector(
      '.xft-list-field__ul'
    );

    this._contentElement = this._ref.nativeElement.querySelector(
      '.xft-list-field__content'
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.changeStatusEnabled(changes);
  }

  public get value(): ListFieldElement | undefined {
    return this._value;
  }

  public get higher(): boolean {
    return this._higher && !this.sheetMode;
  }

  public onBlur(): void {
    this.status.active = false;
  }

  public onFocus(): void {
    this.status.active = true;
  }

  public onClickBackdrop(): void {
    this.hideSuggestions();
  }

  protected focusInput(): void {
    if (!this.status.disabled) {
      this._inputElement?.focus();
    }
  }

  protected toogleSuggestions(): void {
    this.status.show ? this.hideSuggestions() : this.showSuggestions();
  }

  protected showSuggestions(): void {
    if (!this.status.disabled) {
      this._setLocationVisibleListSuggestions();

      this.setVisibleSuggestions(true);
    }
  }

  protected hideSuggestions(): void {
    if (!this.status.disabled) {
      this.setVisibleSuggestions(false);
    }
  }

  protected setVisibleSuggestions(visible: boolean): void {
    this.status.show = visible;
    this.status.hide = !visible;
  }

  protected changeStatusEnabled(changes: SimpleChanges): void {
    if (changes['enabled']) {
      this._setDisabled(!changes['enabled'].currentValue);
    }
  }

  protected setDefineValue(element: ListFieldElement): void {
    this.setValue(element);

    this.onChange(element.value);
    this.onTouch(element.value);
  }

  protected setValue(element?: ListFieldElement): void {
    this._value = element;
    this.suggestion = element?.description || '';
  }

  protected navigationInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
        if (this.status.show && this.higher) {
          this._navigationInputUp();
        }
        break;

      case 'ArrowDown':
        if (this.status.show && !this.higher) {
          this._navigationInputDown();
        }
        break;
    }
  }

  protected navigationElement(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
        this._navigationElementUp();
        break;

      case 'ArrowDown':
        this._navigationElementDown();
        break;
    }
  }

  protected _navigationInputUp(): void {
    this._elements = this._listElement?.querySelectorAll(
      '.xft-list-field__element'
    );

    const length = this._elements?.length || 0;

    if (length) {
      this._positionElement = length - 1;

      this._elements?.item(this._positionElement).focus();

      if (this._positionElement > maxPositionVisible) {
        const elementPosition = length - maxPositionVisible;

        setTimeout(() => {
          this._listElement?.scroll({
            top: elementSizePx * elementPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }

  protected _navigationInputDown(): void {
    this._elements = this._listElement?.querySelectorAll(
      '.xft-list-field__element'
    );

    if (this._elements?.length) {
      this._positionElement = 0;

      this._elements?.item(this._positionElement).focus();

      setTimeout(() => {
        this._listElement?.scroll({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  protected _navigationElementUp(): void {
    if (this._positionElement > 0) {
      this._positionElement--;

      this._elements?.item(this._positionElement).focus();
    } else if (!this.higher) {
      this._inputElement?.focus();
    }
  }

  protected _navigationElementDown(): void {
    const newPosition = this._positionElement + 1;
    const length = this._elements?.length || 0;

    if (newPosition < length) {
      this._positionElement = newPosition;

      this._elements?.item(this._positionElement).focus();
    } else if (this.higher) {
      this._inputElement?.focus();
    }
  }

  private _setLocationVisibleListSuggestions(): void {
    if (this._contentElement) {
      const { top, height } = this._contentElement.getBoundingClientRect();
      const overflow = baseSizePx / 2;

      const positionEnd = top + height + maxListSizePx + overflow;

      this._higher = positionEnd > window.innerHeight;
    }
  }

  private _setDisabled(disabled: boolean): void {
    this.status.disabled = disabled;

    if (disabled) {
      this.setVisibleSuggestions(false);
    }
  }

  public writeValue(value?: unknown): void {
    let valueElement = undefined;

    if (value) {
      const result = this.suggestions.filter((el) => el.compareTo(value));

      if (result) {
        valueElement = result[0];
      }
    }

    this.setValue(valueElement);
  }

  public registerOnChange(onChange: (value?: unknown) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: unknown) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this._setDisabled(disabled);
  }
}
