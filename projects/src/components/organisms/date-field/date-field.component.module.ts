import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponentModule } from '../../atoms';
import { DatePickerComponentModule } from '../date-picker/date-picker.component.module';
import { ModalComponentModule } from '../modal/modal.component.module';
import { DateFieldComponent } from './date-field.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerComponentModule,
    ModalComponentModule,
    IconComponentModule
  ],
  declarations: [DateFieldComponent],
  exports: [DateFieldComponent]
})
export class DateFieldComponentModule {}
