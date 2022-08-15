import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponentModule } from '../../atoms/checkbox/checkbox.component.module';
import { CheckboxLabelComponent } from './checkbox-label.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CheckboxComponentModule],
  declarations: [CheckboxLabelComponent],
  exports: [CheckboxLabelComponent]
})
export class CheckboxLabelComponentModule {}
