import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RadiobuttonComponentModule } from '../../atoms/radiobutton/radiobutton.component.module';
import { RadiobuttonLabelComponent } from './radiobutton-label.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RadiobuttonComponentModule],
  declarations: [RadiobuttonLabelComponent],
  exports: [RadiobuttonLabelComponent]
})
export class RadiobuttonLabelComponentModule {}
