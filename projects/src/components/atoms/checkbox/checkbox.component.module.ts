import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '../icon/icon.component.module';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent]
})
export class CheckboxComponentModule {}
