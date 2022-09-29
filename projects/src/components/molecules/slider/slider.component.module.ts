import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { IconComponentModule } from '../../atoms';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, ReactiveFormsModule, IconComponentModule],
  exports: [SliderComponent]
})
export class SliderComponentModule {}
