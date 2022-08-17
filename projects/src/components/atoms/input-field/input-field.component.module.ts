import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './input-field.component';

@NgModule({
  imports: [ReactiveFormsModule],
  declarations: [InputFieldComponent],
  exports: [InputFieldComponent]
})
export class InputFieldComponentModule {}
