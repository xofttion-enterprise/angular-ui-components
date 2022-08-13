import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputFieldStatus, InputType } from '../../types/input';
import { ComponentDOM } from '../../utils/dom';

@Component({
  selector: 'xft-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextFieldComponent implements OnInit {
  @Input()
  public inputControl: FormControl;

  @Input()
  public elementId?: string;

  @Input()
  public type: InputType = 'text';

  @Input()
  public label = '';

  @Input()
  public placeholder = '';

  @Input()
  public enabled = true;

  private _componentDOM: ComponentDOM;

  private _status: InputFieldStatus;

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
    this._componentDOM.addClass('xft-text-field');
  }

  public get status(): InputFieldStatus {
    return this._status;
  }

  public onStatus(status: InputFieldStatus): void {
    this._status = status;
  }
}
