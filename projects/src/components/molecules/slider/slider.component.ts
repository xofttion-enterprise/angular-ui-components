import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentDOM } from '../../utils';

const MAX_PERCENTAGE = 100;
const MIN_PERCENTAGE = 0;

@Component({
  selector: 'xft-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements OnInit, ControlValueAccessor {
  @Input()
  public label?: string;

  @Input()
  public minIcon?: string;

  @Input()
  public maxIcon?: string;

  @Input()
  public enabled = true;

  @Input()
  public minValue = 0;

  @Input()
  public maxValue = 100;

  @Input()
  public fixed = 0;

  private _componentDOM: ComponentDOM;

  private _value = 0;

  private _trackElement?: HTMLElement;

  private _onElement?: HTMLElement;

  private _thumbElement?: HTMLElement;

  public onChange = (_?: number): void => undefined;

  public onTouch = (_?: number): void => undefined;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-slider');

    this._trackElement =
      this._ref.nativeElement.querySelector('.xft-slider__track');

    this._onElement = this._ref.nativeElement.querySelector(
      '.xft-slider__track__on'
    );

    this._thumbElement = this._ref.nativeElement.querySelector(
      '.xft-slider__track__thumb'
    );

    if (this._value < this.minValue) {
      this._approvedValue(this.minValue);
    }
  }

  public get value(): string {
    return this._value.toFixed(this.fixed);
  }

  public get isMinValue(): boolean {
    return this._value === this.minValue;
  }

  public get isMaxValue(): boolean {
    return this._value === this.maxValue;
  }

  public onClickTrack(event: MouseEvent): void {
    if (this._trackElement) {
      const width = this._trackElement.clientWidth;

      const percentage = (event.offsetX / width) * MAX_PERCENTAGE;

      const value = (percentage * this._rangeValue) / MAX_PERCENTAGE;

      this._approvedValue(value + this.minValue);
    }
  }

  public onClickMinValue(): void {
    this._approvedValue(this.minValue);
  }

  public onClickMaxValue(): void {
    this._approvedValue(this.maxValue);
  }

  private get _rangeValue(): number {
    return this.maxValue - this.minValue;
  }

  private _approvedValue(value: number): void {
    this.onChange(value);
    this.onTouch(value);

    this._setValue(value);
  }

  private _setValue(value: number): void {
    this._value = value;

    const percentage = this._getPercentage(value);

    this._setStylePercentage(percentage);
  }

  private _getPercentage(value: number): number {
    if (value === this.minValue) {
      return MIN_PERCENTAGE;
    }

    if (value === this.maxValue) {
      return MAX_PERCENTAGE;
    }

    const op = value - this.minValue;

    return (op / this._rangeValue) * MAX_PERCENTAGE;
  }

  private _setStylePercentage(percentage: number): void {
    if (this._thumbElement) {
      this._renderer.setStyle(this._thumbElement, 'left', `${percentage}%`);
    }

    if (this._onElement) {
      this._renderer.setStyle(this._onElement, 'width', `${percentage}%`);
    }
  }

  private _getValueCertificate(value: number): number {
    if (value < this.minValue) {
      return this.minValue;
    }

    if (value > this.maxValue) {
      return this.maxValue;
    }

    return value;
  }

  public writeValue(value?: number): void {
    if (value) {
      const newValue = this._getValueCertificate(value);

      this._setValue(newValue);
    } else {
      this._setValue(this.minValue);
    }
  }

  public registerOnChange(onChange: (value?: number) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: number) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.enabled = !disabled;
  }
}
