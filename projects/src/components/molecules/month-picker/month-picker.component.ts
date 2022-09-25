import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentDOM } from '../../utils';
import { MonthModel, MONTHS } from './month-utils';

interface MonthPickerStatus {
  disabled: boolean;
}

export const MONTH_MIN = 0;
export const MONTH_MAX = 11;

@Component({
  selector: 'xft-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthPickerComponent),
      multi: true
    }
  ]
})
export class MonthPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input()
  public readonly = false;

  @Input()
  public date = new Date();

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  private _componentDOM: ComponentDOM;

  private _value: number;

  public months = MONTHS;

  public status: MonthPickerStatus;

  public onChange = (_?: number): void => undefined;

  public onTouch = (_?: number): void => undefined;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this._value = this.date.getMonth();

    this.status = {
      disabled: false
    };
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-month-picker');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeStatusEnabled(changes);
    this._changeStatusDate(changes);
  }

  public get value(): number {
    return this._value;
  }

  public get minYear(): number {
    return this.minDate?.getFullYear() || 0;
  }

  public get maxYear(): number {
    return this.maxDate?.getFullYear() || 10000;
  }

  public get minMonth(): number {
    return this.minDate?.getMonth() || MONTH_MIN;
  }

  public get maxMonth(): number {
    return this.maxDate?.getMonth() || MONTH_MAX;
  }

  public isSelected(month: MonthModel): boolean {
    return this.value === month.value;
  }

  public isDisabled(month: MonthModel): boolean {
    return this._isOverflow(this.date, month.value);
  }

  public onClickMonth(monthModel: MonthModel): void {
    this.onChange(monthModel.value);
    this.onTouch(monthModel.value);

    this._approvedValue(monthModel.value);
  }

  private _changeStatusEnabled(changes: SimpleChanges): void {
    if (changes['enabled']) {
      this.setDisabledState(!changes['enabled'].currentValue);
    }
  }

  private _changeStatusDate(changes: SimpleChanges): void {
    if (changes['date']) {
      const date = changes['date'].currentValue;

      if (!!date && this._isOverflow(date, this.value)) {
        this._recalculateValue(date, this.value);
      }
    }
  }

  private _setValue(value?: number): void {
    const month = this._getValue(value);

    if (this._isOverflow(this.date, month)) {
      this._recalculateValue(this.date, month);
    } else {
      this._approvedValue(month);
    }
  }

  private _getValue(value?: number): number {
    if (!value) {
      return new Date().getMonth();
    }

    return value;
  }

  private _approvedValue(value: number): void {
    this._value = value;
  }

  private _recalculateValue(date: Date, value: number): void {
    let valueMonth = 0;

    if (this._isOverflowMin(date, value)) {
      valueMonth = this.minMonth;
    } else {
      valueMonth = this.maxMonth;
    }

    this._approvedValue(valueMonth);

    this.onChange(valueMonth);
    this.onTouch(valueMonth);
  }

  private _isOverflow(date: Date, month: number): boolean {
    return this._isOverflowMin(date, month) || this._isOverflowMax(date, month);
  }

  private _isOverflowMin(date: Date, month: number): boolean {
    return date.getFullYear() === this.minYear && month < this.minMonth;
  }

  private _isOverflowMax(date: Date, month: number): boolean {
    return date.getFullYear() === this.maxYear && month > this.maxMonth;
  }

  public writeValue(value?: number): void {
    this._setValue(value);
  }

  public registerOnChange(onChange: (value?: number) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: number) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.status.disabled = disabled;
  }
}
