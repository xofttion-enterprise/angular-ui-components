import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors
} from '@angular/forms';
import { InputType, InputFieldStatus } from '../../types/input';
import { ComponentDOM } from '../../utils/dom';

const MSG_ERROR_DEFAULT = 'Campo no cumple validación';

@Component({
  selector: 'xft-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input()
  public elementId?: string;

  @Input()
  public formControl?: FormControl;

  @Input()
  public type: InputType = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public enabled = true;

  @Input()
  public valueFormat = '';

  @Output()
  public status: EventEmitter<InputFieldStatus>;

  private _componentDOM: ComponentDOM;

  private _statusField: InputFieldStatus;

  public input = '';

  public onChange = (_?: string): void => undefined;

  public onTouch = (_?: string): void => undefined;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this._statusField = {
      active: false,
      disabled: false,
      error: false,
      msgError: MSG_ERROR_DEFAULT
    };

    this.status = new EventEmitter();
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-input-field');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeEnabled(changes);
  }

  public get statusField(): InputFieldStatus {
    return this._statusField;
  }

  public onFocus(): void {
    this._statusField.active = true;

    this.status.emit(this._statusField);
  }

  public onBlur(): void {
    this._statusField.active = false;

    this.status.emit(this._statusField);

    this._checkErrorStatus(this.formControl);
  }

  public onInput(event: Event): void {
    const inputTarget = event.target as HTMLInputElement;

    this.input = inputTarget.value;

    this.onTouch(inputTarget.value);
    this.onChange(inputTarget.value);

    if (this.statusField.error) {
      this._checkErrorStatus(this.formControl);
    }
  }

  private _changeEnabled(changes: SimpleChanges): void {
    if (changes['enabled']) {
      this.setDisabledState(!changes['enabled'].currentValue);
    }
  }

  private _checkErrorStatus(formControl?: FormControl): void {
    if (!!formControl && formControl.invalid) {
      this.statusField.error = true;

      if (formControl.errors) {
        this._changeMsgError(formControl.errors);
      }
    } else {
      this.statusField.error = false;
    }

    this.status.emit(this.statusField);
  }

  private _changeMsgError(errors: ValidationErrors): void {
    const errorsFormat = Object.keys(errors).map((key) => errors[key]);

    let msgError = MSG_ERROR_DEFAULT;

    if (errorsFormat.length) {
      msgError = errorsFormat[0].message || MSG_ERROR_DEFAULT;
    }

    this.statusField.msgError = msgError;
  }

  public writeValue(value?: string): void {
    this.input = value || '';
  }

  public registerOnChange(onChange: (value?: string) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: (value?: string) => void): void {
    this.onTouch = onTouch;
  }

  public setDisabledState(disabled: boolean): void {
    this.statusField.disabled = disabled;

    this.status.emit(this.statusField);
  }
}
