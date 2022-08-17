import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  getDateFormat,
  getDateWeight,
  MONTHS_NAME
} from '@xofttion-enterprise/utils';
import { Subscription } from 'rxjs';
import { DateFactory } from '../../molecules/day-picker/day-utils';
import { ComponentDOM } from '../../utils/dom';
import { DatePickerForm } from './date-picker.form';
import { DatePickerListener, DatePickerListenerName } from './date-utils';

interface DatePickerStatus {
  disabled: boolean;
}

interface ComponentVisibility {
  day: boolean;
  month: boolean;
  year: boolean;
}

@Component({
  selector: 'xft-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent
  implements OnInit, OnDestroy, AfterViewChecked, ControlValueAccessor
{
  @Input()
  public enabled = true;

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  @Input()
  public automatic = false;

  @Input()
  public material?: string;

  @Output()
  public listener: EventEmitter<DatePickerListener>;

  private _componentDOM: ComponentDOM;

  public value: Date;

  public date: DatePickerForm;

  public subscriptions: Array<Subscription> = [];

  public status: DatePickerStatus;

  public visibility: ComponentVisibility;

  public onChange = (_?: Date): void => undefined;

  public onTouch = (_?: Date): void => undefined;

  constructor(
    private _ref: ElementRef,
    private _renderer: Renderer2,
    private _changedDetectorRef: ChangeDetectorRef
  ) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this.listener = new EventEmitter<DatePickerListener>();

    this.value = new Date();

    this.date = new DatePickerForm(this.value);

    this.status = {
      disabled: false
    };

    this.visibility = {
      day: true,
      month: false,
      year: false
    };
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-date-picker');

    const yearSubscription = this.date.yearSubscribe((year) => {
      const newValue = DateFactory.setYear(this.value, year);

      this._setValue(newValue);
      this._showComponent('day');
    });

    const monthSubscription = this.date.monthSubscribe((month) => {
      const newValue = DateFactory.setMonth(this.value, month);

      this._setValue(newValue);
      this._showComponent('day');
    });

    const daySubscription = this.date.daySubscribe((day) => {
      const newValue = DateFactory.setDay(this.value, day);

      this._setValue(newValue);

      if (this.automatic) {
        this.onChange(newValue);
        this.onTouch(newValue);
      }
    });

    this.subscriptions.push(yearSubscription);
    this.subscriptions.push(monthSubscription);
    this.subscriptions.push(daySubscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public ngAfterViewChecked(): void {
    this._changedDetectorRef.detectChanges();
  }

  public get title(): string {
    return getDateFormat(this.value, 'dw, mx dd de aa');
  }

  public get year(): string {
    return this.value.getFullYear().toString();
  }

  public get month(): string {
    return MONTHS_NAME[this.value.getMonth()];
  }

  public onClickDay(): void {
    this._showComponent('day');
  }

  public onClickMonth(): void {
    this._showComponent('month');
  }

  public onClickYear(): void {
    this._showComponent('year');
  }

  public onSelect(): void {
    this.onChange(this.value);
    this.onTouch(this.value);

    this._emitListener('DateSelect', this.value);
  }

  public onToday(): void {
    const value = new Date();

    this.onChange(value);
    this.onTouch(value);

    this._setValue(value);

    this._emitListener('DateToday', value);
  }

  public onCancel(): void {
    this._emitListener('DateCancel');
  }

  private _emitListener(name: DatePickerListenerName, value?: Date): void {
    this.listener.emit({ name, value });
  }

  private _showComponent(key: string): void {
    Object.keys(this.visibility).forEach((keyComponent) => {
      (this.visibility as any)[keyComponent] = false;
    });

    (this.visibility as any)[key] = true;
  }

  private _setValue(date?: Date): void {
    if (date) {
      if (this._isOverflow(date)) {
        this._recalculateValue(date);
      } else {
        this.value = date;
      }
    }
  }

  private _recalculateValue(date: Date): void {
    if (this._isOverflowMin(date)) {
      this.value = this.minDate as Date;
    } else {
      this.value = this.maxDate as Date;
    }

    this.onChange(this.value);
    this.onTouch(this.value);
  }

  private _isOverflow(date: Date): boolean {
    return this._isOverflowMin(date) || this._isOverflowMax(date);
  }

  private _isOverflowMin(date: Date): boolean {
    return this.minDate
      ? getDateWeight(date) < getDateWeight(this.minDate)
      : false;
  }

  private _isOverflowMax(date: Date): boolean {
    return this.maxDate
      ? getDateWeight(date) > getDateWeight(this.maxDate)
      : false;
  }

  public writeValue(value?: Date): void {
    this._setValue(value);
  }

  public registerOnChange(onChange: (value?: Date) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: Date) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.status.disabled = disabled;
  }
}
