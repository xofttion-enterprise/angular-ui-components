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
import { YearModel, yearFactory } from './year-utils';

export const YEAR_RANGE = 4;

interface YearPickerStatus {
  disabled: boolean;
}

@Component({
  selector: 'xft-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true
    }
  ]
})
export class YearPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input()
  public enabled = true;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  private _componentDOM: ComponentDOM;

  private _value: number;

  private _yearSelect: YearModel;

  private _emitter?: (_: number) => void;

  public years: Array<YearModel> = [];

  public minYearRange: number;

  public maxYearRange: number;

  public status: YearPickerStatus;

  public onChange = (_?: number): void => undefined;

  public onTouch = (_?: number): void => undefined;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this._value = new Date().getFullYear();

    this.minYearRange = this._value;
    this.maxYearRange = this._value;

    this._yearSelect = this._buildModel(this._value);

    this.status = {
      disabled: false
    };
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-year-picker');

    this._renderComponent(this._value);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeStatusEnabled(changes);
  }

  public setEmitter(newEmitter: (_: number) => void): void {
    this._emitter = newEmitter;
  }

  public set value(newValue: number) {
    this._setValue(newValue);
  }

  public get value(): number {
    return this._value;
  }

  public onClickYear(yearModel: YearModel): void {
    if (yearModel.value) {
      this._approvedValue(yearModel.value);

      this.onChange(yearModel.value);
      this.onTouch(yearModel.value);

      if (this._emitter) {
        this._emitter(yearModel.value);
      }
    }
  }

  public onClickPrev(): void {
    if (this._yearSelect.value) {
      let yearCenter = this._yearSelect.value - YEAR_RANGE * 2;

      if (this._isOverflowMin(yearCenter)) {
        yearCenter = this.minYear;
      }

      this._renderComponent(yearCenter);
    }
  }

  public onClickNext(): void {
    if (this._yearSelect.value) {
      let yearCenter = this._yearSelect.value + YEAR_RANGE * 2;

      if (this._isOverflowMax(yearCenter)) {
        yearCenter = this.maxYear;
      }

      this._renderComponent(yearCenter);
    }
  }

  public get isPrevDisabled(): boolean {
    return this.minYear >= this.minYearRange;
  }

  public get isNextDisabled(): boolean {
    return this.maxYear <= this.maxYearRange;
  }

  private get minYear(): number {
    return this.minDate?.getFullYear() || 0;
  }

  private get maxYear(): number {
    return this.maxDate?.getFullYear() || 10000;
  }

  private _changeStatusEnabled(changes: SimpleChanges): void {
    if (changes['enabled']) {
      this.setDisabledState(!changes['enabled'].currentValue);
    }
  }

  private _setValue(value?: number): void {
    const year = this._getValue(value);

    if (this._isOverflow(year)) {
      this._recalculateValue(year);
    } else {
      this._approvedValue(year);
    }
  }

  private _getValue(value?: number): number {
    if (!value) {
      return new Date().getFullYear();
    }

    return value;
  }

  private _approvedValue(value: number): void {
    this._value = value;

    this._renderComponent(value);
  }

  private _recalculateValue(value: number): void {
    let valueYear = 0;

    if (this._isOverflowMin(value)) {
      valueYear = this.minYear;
    } else {
      valueYear = this.maxYear;
    }

    this._approvedValue(valueYear);

    this.onChange(valueYear);
    this.onTouch(valueYear);
  }

  private _renderComponent(year: number): void {
    this.minYearRange = year;
    this.maxYearRange = year;

    this.years = this._getArrayYears(year);
  }

  private _getArrayYears(year: number): Array<YearModel> {
    const prevYears: Array<YearModel> = [];
    const nextYears: Array<YearModel> = [];

    for (let index = 0; index < YEAR_RANGE; index++) {
      const yearPrev = year - YEAR_RANGE + index;
      const yearNext = year + index + 1;

      const valuePrev = yearPrev >= this.minYear ? yearPrev : undefined;
      const valueNext = yearNext <= this.maxYear ? yearNext : undefined;

      const prevModel = this._buildModel(valuePrev);
      const nextModel = this._buildModel(valueNext);

      prevYears.push(prevModel);
      nextYears.push(nextModel);

      this._recalculateRangeYear(prevModel, nextModel);
    }

    const yearCenter = this._buildModel(year);

    this._onSelect(yearCenter);

    return prevYears.concat(yearCenter).concat(nextYears);
  }

  private _buildModel(value?: number): YearModel {
    return yearFactory(value, !value, value === this._value);
  }

  private _recalculateRangeYear(
    prevModel: YearModel,
    nextModel: YearModel
  ): void {
    if (!!prevModel.value && this.minYearRange > prevModel.value) {
      this.minYearRange = prevModel.value;
    }

    if (!!nextModel.value && this.maxYearRange < nextModel.value) {
      this.maxYearRange = nextModel.value;
    }
  }

  private _onSelect(newYearSelect: YearModel): void {
    if (newYearSelect.value) {
      this._yearSelect.status.selected = false;

      this._yearSelect = newYearSelect;
    }
  }

  private _isOverflow(year: number): boolean {
    return this._isOverflowMin(year) || this._isOverflowMax(year);
  }

  private _isOverflowMin(year: number): boolean {
    return year < this.minYear;
  }

  private _isOverflowMax(year: number): boolean {
    return year > this.maxYear;
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
