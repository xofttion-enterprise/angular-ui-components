import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponentModule } from '../../atoms/input-field/input-field.component.module';
import { MoneyFieldComponent } from './money-field.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, InputFieldComponentModule],
  declarations: [MoneyFieldComponent],
  exports: [MoneyFieldComponent]
})
export class MoneyFieldComponentModule {}
