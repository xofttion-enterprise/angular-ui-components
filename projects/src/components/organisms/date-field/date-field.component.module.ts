import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFieldComponent } from './date-field.component';
import { IconComponentModule } from '../../atoms/icon/icon.component.module';
import { ModalComponentModule } from '../modal/modal.component.module';
import { DatePickerComponentModule } from '../date-picker/date-picker.component.module';

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
