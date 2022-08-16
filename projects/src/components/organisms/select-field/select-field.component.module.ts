import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from './select-field.component';
import { BallotComponentModule } from '../../molecules/ballot/ballot.component.module';
import { InputFieldComponentModule } from '../../atoms/input-field/input-field.component.module';
import { IconComponentModule } from '../../atoms/icon/icon.component.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BallotComponentModule,
    InputFieldComponentModule,
    IconComponentModule
  ],
  declarations: [SelectFieldComponent],
  exports: [SelectFieldComponent]
})
export class SelectFieldComponentModule {}
