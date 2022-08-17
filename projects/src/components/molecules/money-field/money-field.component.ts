import { formatCurrency } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputFieldStatus } from '../../types/input';
import { ComponentDOM } from '../../utils/dom';

@Component({
  selector: 'xft-money-field',
  templateUrl: './money-field.component.html',
  styleUrls: ['./money-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoneyFieldComponent implements OnInit, OnDestroy {
  @Input()
  public inputControl: FormControl;

  @Input()
  public elementId?: string;

  @Input()
  public label = true;

  @Input()
  public placeholder = '';

  @Input()
  public enabled = true;

  @Input()
  public currencyCode = 'COP';

  @Input()
  public symbol = '';

  @Input()
  public locale = 'en-US';

  @Input()
  public digits = '.2-2';

  @Input()
  public suffixIcon?: string;

  private _componentDOM: ComponentDOM;

  private _value = '';

  private _status: InputFieldStatus;

  private _subscription?: Subscription;

  constructor(private _ref: ElementRef, private _renderer: Renderer2) {
    this._componentDOM = ComponentDOM.build(this._ref, this._renderer);

    this._status = {
      active: false,
      disabled: false,
      error: false,
      msgError: ''
    };

    this.inputControl = new FormControl(null);
  }

  public ngOnInit(): void {
    this._componentDOM.addClass('xft-money-field');

    this._setValueFormat(this.inputControl.value);

    this._subscription = this.inputControl.valueChanges.subscribe((value) =>
      this._setValueFormat(value)
    );
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  public get status(): InputFieldStatus {
    return this._status;
  }

  public get value(): string {
    return this._value;
  }

  public onStatus(status: InputFieldStatus): void {
    this._status = status;
  }

  private _setValueFormat(value: string): void {
    this._value = formatCurrency(
      +value,
      this.locale,
      this.symbol,
      this.currencyCode,
      this.digits
    );
  }
}
