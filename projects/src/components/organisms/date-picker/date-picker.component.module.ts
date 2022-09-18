import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponentModule } from '../../atoms';
import {
  DayPickerComponentModule,
  MonthPickerComponentModule,
  YearPickerComponentModule
} from '../../molecules';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DayPickerComponentModule,
    MonthPickerComponentModule,
    YearPickerComponentModule,
    ButtonComponentModule
  ],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent]
})
export class DatePickerComponentModule {}
