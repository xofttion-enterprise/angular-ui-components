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

@Component({
  selector: 'xft-switch-label',
  templateUrl: './switch-label.component.html',
  styleUrls: ['./switch-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchLabelComponent),
      multi: true
    }
  ]
})
export class SwitchLabelComponent implements OnInit, ControlValueAccessor {
  @Input()
  public elementId?: string;

  @Input()
  public checked = true;

  @Input()
  public enabled = true;

  private _componentDOM: ComponentDOM;

  private _value = false;

  public onChange = (_?: boolean): void => undefined;

  public onTouch = (_?: boolean): void => undefined;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-switch-label');
  }

  public set value(newValue: boolean) {
    this._value = newValue;
  }

  public get value(): boolean {
    return this._value;
  }

  public onClickToggle(): void {
    this.value = !this._value;

    this.onTouch(this.value);
    this.onChange(this.value);
  }

  public writeValue(value?: boolean): void {
    this.value = value || false;
  }

  public registerOnChange(onChange: (value?: boolean) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: boolean) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.enabled = !disabled;
  }
}
