import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '../icon/icon.component.module';
import { ButtonActionComponent } from './button-action.component';

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [ButtonActionComponent],
  exports: [ButtonActionComponent]
})
export class ButtonActionComponentModule {}
