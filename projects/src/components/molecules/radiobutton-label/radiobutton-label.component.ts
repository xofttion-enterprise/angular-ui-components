import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { ComponentDOM } from '../../utils';

@Component({
  selector: 'xft-radiobutton-label',
  templateUrl: './radiobutton-label.component.html',
  styleUrls: ['./radiobutton-label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonLabelComponent),
      multi: true
    }
  ]
})
export class RadiobuttonLabelComponent implements OnInit, ControlValueAccessor {
  @Input()
  public elementId?: string;

  @Input()
  public formControl?: FormControl;

  @Input()
  public value: any = null;

  @Input()
  public enabled = true;

  private _componentDOM: ComponentDOM;

  public onChange = (_?: any): void => undefined;

  public onTouch = (_?: any): void => undefined;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-radiobutton-label');
  }

  public get checked(): boolean {
    return !!this.formControl && this.formControl.value === this.value;
  }

  public onClickToggle(): void {
    this.onTouch(this.value);
    this.onChange(this.value);
  }

  public writeValue(_: any): void {}

  public registerOnChange(onChange: (value?: any) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: any) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.enabled = !disabled;
  }
}
