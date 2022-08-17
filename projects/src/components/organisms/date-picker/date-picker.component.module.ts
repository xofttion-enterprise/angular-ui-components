import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponentModule } from '../../atoms/button/button.component.module';
import { DayPickerComponentModule } from '../../molecules/day-picker/day-picker.component.module';
import { MonthPickerComponentModule } from '../../molecules/month-picker/month-picker.component.module';
import { YearPickerComponentModule } from '../../molecules/year-picker/year-picker.component.module';
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
