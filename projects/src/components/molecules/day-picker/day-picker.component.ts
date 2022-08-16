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
import { ComponentDOM } from '../../utils/dom';
import {
  DateFactory,
  DateParams,
  DateUtils,
  DayModel,
  DayPickerStatus,
  DayToModel,
  WeekModel
} from './day-utils';

@Component({
  selector: 'xft-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DayPickerComponent),
      multi: true
    }
  ]
})
export class DayPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input()
  public enabled = true;

  @Input()
  public date: Date;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  private _componentDOM: ComponentDOM;

  private _value: number;

  public status: DayPickerStatus;

  public titles: Array<string>;

  public weeks: Array<WeekModel> = [];

  private _dateStart: Date = new Date();

  public onChange = (_?: number): void => undefined;

  public onTouch = (_?: number): void => undefined;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.titles = DateParams.days.weekmin;

    this.date = new Date();

    this._value = this.date.getDate();

    this.status = {
      disabled: false
    };
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-day-picker');

    this._dateStart.setDate(1);

    this._renderComponent();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeStatusEnabled(changes);
    this._changeStatusDate(changes);
  }

  public set value(_value: number) {
    this._setValue(_value);
  }

  public get value(): number {
    return this._value;
  }

  public isSelected(dayModel: DayModel): boolean {
    return this._value === dayModel.value;
  }

  public isDisabled(dayModel: DayModel): boolean {
    if (dayModel.value) {
      return this._isOverflow(this.date, dayModel.value);
    }

    return true;
  }

  public onClickDay(dayModel: DayModel): void {
    if (dayModel.value) {
      this.onChange(dayModel.value);
      this.onTouch(dayModel.value);

      this._setValue(dayModel.value);
    }
  }

  public get minDay(): number {
    return this.minDate ? this.minDate.getDate() : this.date.getDate();
  }

  public get maxDay(): number {
    return this.maxDate ? this.maxDate.getDate() : this.date.getDate();
  }

  public get minMonth(): number {
    return this.minDate ? this.minDate.getMonth() : this.date.getMonth();
  }

  public get maxMonth(): number {
    return this.maxDate ? this.maxDate.getMonth() : this.date.getMonth();
  }

  private _setValue(value?: number): void {
    this._value = this._getValue(value);
  }

  private _getValue(value?: number): number {
    if (!value) {
      return new Date().getDate();
    }

    return value;
  }

  private _changeStatusEnabled(changes: SimpleChanges): void {
    if (changes['enabled']) {
      this.setDisabledState(!changes['enabled'].currentValue);
    }
  }

  private _changeStatusDate(changes: SimpleChanges): void {
    if (changes['date']) {
      let dateValue = changes['date'].currentValue;

      if (this._isOverflow(dateValue, dateValue.getDate())) {
        dateValue = this._rebuildDate(dateValue);

        this.date = dateValue;

        this.onChange(this.date.getDate());
        this.onTouch(this.date.getDate());
      }

      this._dateStart.setFullYear(dateValue.getFullYear());
      this._dateStart.setMonth(dateValue.getMonth());

      this._setValue(dateValue.getDate());

      this._renderComponent();
    }
  }

  private _rebuildDate(date: Date): Date {
    const newDate = new Date(date.getTime());

    if (this._isOverflowMin(date, date.getDate())) {
      newDate.setMonth(this.minMonth);
      newDate.setDate(this.minDay);
    } else {
      newDate.setMonth(this.maxMonth);
      newDate.setDate(this.maxDay);
    }

    return newDate;
  }

  private _renderComponent(): void {
    const dayStart = this._dateStart.getDay();

    this.weeks = []; // Reiniciando semanas

    this._setFirstWeek(dayStart);
    this._setMiddleWeeks(dayStart);
  }

  private _setFirstWeek(dayStart: number): void {
    const firstWeek: WeekModel = { days: [] };

    let day = 1;

    for (let start = 0; start < dayStart; start++) {
      firstWeek.days.push(this._getDayModel());
    }

    for (let end = dayStart; end < 7; end++) {
      firstWeek.days.push(this._getDayModel(day));

      day++;
    }

    this.weeks.push(firstWeek);
  }

  private _setMiddleWeeks(dayStart: number): void {
    const dayCount = this._getDaysMonth();

    let day = 8 - dayStart;
    let week: WeekModel = { days: [] };
    let countDaysWeek = 1;

    do {
      week.days.push(this._getDayModel(day));

      day++;
      countDaysWeek++;

      if (countDaysWeek > 7) {
        this.weeks.push(week);

        countDaysWeek = 1;
        week = { days: [] };
      }
    } while (day <= dayCount);

    this._setLastWeek(week); // Completando semanas
  }

  private _setLastWeek(week: WeekModel): void {
    if (week.days.length) {
      const length = 7 - week.days.length;

      for (let index = 0; index < length; index++) {
        week.days.push(this._getDayModel());
      }

      this.weeks.push(week);
    }
  }

  private _getDaysMonth(): number {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();

    return DateUtils.getDaysMonth(year, month);
  }

  private _getDayModel(value?: number): DayModel {
    const overflow = this._isOverflow(this.date, value || 0);

    return DayToModel(value, overflow, !value);
  }

  private _isOverflow(date: Date, day: number): boolean {
    return this._isOverflowMin(date, day) || this._isOverflowMax(date, day);
  }

  private _isOverflowMin(date: Date, day: number): boolean {
    if (this.minDate) {
      const newDate = DateFactory.setDay(date, day);

      const weightDate = DateUtils.weight(newDate);
      const weightMinDate = DateUtils.weight(this.minDate);

      return weightDate < weightMinDate;
    }

    return false;
  }

  private _isOverflowMax(date: Date, day: number): boolean {
    if (this.maxDate) {
      const newDate = DateFactory.setDay(date, day);

      const weightDate = DateUtils.weight(newDate);
      const weightMaxDate = DateUtils.weight(this.maxDate);

      return weightDate > weightMaxDate;
    }

    return false;
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
