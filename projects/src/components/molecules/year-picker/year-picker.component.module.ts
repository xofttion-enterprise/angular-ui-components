import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponentModule } from '../../atoms';
import { YearPickerComponent } from './year-picker.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IconComponentModule],
  declarations: [YearPickerComponent],
  exports: [YearPickerComponent]
})
export class YearPickerComponentModule {}
