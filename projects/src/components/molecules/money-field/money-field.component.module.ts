import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponentModule } from '../../atoms';
import { MoneyFieldComponent } from './money-field.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, InputFieldComponentModule],
  declarations: [MoneyFieldComponent],
  exports: [MoneyFieldComponent]
})
export class MoneyFieldComponentModule {}
