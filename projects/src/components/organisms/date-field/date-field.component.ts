import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { getDateFormat } from '@xofttion-enterprise/utils';
import { ComponentDOM } from '../../utils';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DatePickerListener } from '../date-picker/date-utils';
import {
  ModalComponentService,
  ModalOverlayComponent
} from '../modal/modal.component.service';

interface DateFieldStatus {
  active: boolean;
  disabled: boolean;
}

@Component({
  selector: 'xft-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true
    }
  ]
})
export class DateFieldComponent
  implements OnInit, OnDestroy, OnChanges, ControlValueAccessor
{
  @Input()
  public elementId?: string;

  @Input()
  public label = true;

  @Input()
  public enabled = true;

  @Input()
  public format = 'dd/mx/aa';

  @Input()
  public minDate?: Date;

  @Input()
  public maxDate?: Date;

  private _componentDOM: ComponentDOM;

  private _modal?: ModalOverlayComponent<DatePickerComponent>;

  private _value?: Date;

  private _dateControl: FormControl;

  public description = '';

  public status: DateFieldStatus;

  public onChange = (_?: Date): void => undefined;

  public onTouch = (_?: Date): void => undefined;

  constructor(
    private _ref: ElementRef,
    private _renderer: Renderer2,
    private _modalService: ModalComponentService
  ) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this._dateControl = new FormControl(new Date());

    this.status = {
      active: false,
      disabled: false
    };
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-input-field');
    this._componentDOM.addClass('xft-date-field');

    this._modal = this._modalService.build(DatePickerComponent);

    this._setValue(this._dateControl.value);

    this._modal.addListener((event) => {
      if (event.value) {
        this._approvedValue(event.value);
      }
    });
  }

  public ngOnDestroy(): void {
    this._modal?.destroy();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._changeStatusEnabled(changes);
  }

  public get value(): Date | undefined {
    return this._value;
  }

  public get iconAction(): string {
    return this._value ? 'trash-2' : 'calendar';
  }

  public onClickInput(): void {
    this._modal?.open();
  }

  public onFocus(): void {
    this.status.active = true;
  }

  public onBlur(): void {
    this.status.active = false;
  }

  public onKeydownInput(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
        this._modal?.open();
        break;

      case 'Enter':
        this._modal?.open();
        break;
    }
  }

  public onClickAction() {
    this._value ? this._approvedValue() : this._modal?.open();
  }

  private _changeStatusEnabled(changes: SimpleChanges): void {
    if (changes['enabled']) {
      this.setDisabledState(!changes['enabled'].currentValue);
    }
  }

  private _approvedValue(value?: Date): void {
    this._setValue(value);

    this.onTouch(value);
    this.onChange(value);
  }

  private _setValue(value?: Date): void {
    this._value = value;

    this.description = value ? getDateFormat(value, this.format) : '';
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
