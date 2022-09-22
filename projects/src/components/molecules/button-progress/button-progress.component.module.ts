import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonProgressComponent } from './button-progress.component';
import {
  ButtonActionComponentModule,
  ProgressCircularComponentModule
} from '../../atoms';

@NgModule({
  imports: [
    CommonModule,
    ButtonActionComponentModule,
    ProgressCircularComponentModule
  ],
  declarations: [ButtonProgressComponent],
  exports: [ButtonProgressComponent]
})
export class ButtonProgressComponentModule {}
