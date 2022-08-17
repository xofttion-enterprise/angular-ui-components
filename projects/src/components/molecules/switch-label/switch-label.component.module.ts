import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchComponentModule } from '../../atoms/switch/switch.component.module';
import { SwitchLabelComponent } from './switch-label.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SwitchComponentModule],
  declarations: [SwitchLabelComponent],
  exports: [SwitchLabelComponent]
})
export class SwitchLabelComponentModule {}
