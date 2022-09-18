import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponentModule } from '../../atoms';
import { BallotComponentModule } from '../../molecules';
import { SelectFieldComponent } from './select-field.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BallotComponentModule,
    IconComponentModule
  ],
  declarations: [SelectFieldComponent],
  exports: [SelectFieldComponent]
})
export class SelectFieldComponentModule {}
